import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import { StoreOptionsService } from './store-options.service';

@Injectable({
  providedIn: 'root'
})

export class LifeService {
  private _cellArray: Array<Array<boolean>> = [];
  private _generationsArray: Array<any> = [];
  public firstGeneration: Array<Array<boolean>> = [];
  public endGeneration: Array<Array<boolean>> = [];
  constructor(
    private _canvasService: CanvasService,
    private _storeOptionsService: StoreOptionsService
  ) { }

  public generateCellArray(): void {
    this._cellArray = [];
    for ( let i = 0; i < this._storeOptionsService.options.gridCount; i++ ) {
      this._cellArray[ i ] = [];
      for ( let j = 0; j < this._storeOptionsService.options.gridCount; j++ ) {
        this._cellArray[ i ][ j ] = false;
      }
    }
    this._canvasService.clearRect();
    this._canvasService.setCanvasSize();
    this._canvasService.createGrid();
  }

  public clearCells() {
    this._cellArray = this._cellArray.map( ( row: Array<boolean> ) => {
      return row.map( () => {
        return false;
      });
    });
    this._generationsArray = [];
    this._canvasService.clearRect();
  }

  private _compareGeneration( generation: any[] = [], generationToCompare: any[] = [] ) {
    return !!( generation.length === 0 && generationToCompare.length === 0 || generation.length > 0 && generation.map( ( element, index ) => {
      if ( element instanceof Array && generationToCompare[ index ] && generationToCompare[ index ] instanceof Array ) {
        return this._compareGeneration( element, generationToCompare[ index ] );
      }
      return generationToCompare[ index ] == element;
    }).indexOf( false ) === -1 );
  }

  public checkLifeStatus(): Array<Array<boolean>> {
    return this._cellArray.map( ( row, indexX ) => {
      return row.map( ( status, indexY ) => {
        let neighborhoods = 0;
        if ( this._cellArray[ indexX ][ this.indexPlus( indexY, false ) + 1 ] ) neighborhoods++;
        if ( this._cellArray[ indexX ][ this.indexMinus( indexY, false ) - 1 ] ) neighborhoods++;
        if ( this._cellArray[ this.indexPlus( indexX, true ) + 1 ][ indexY ] ) neighborhoods++;
        if ( this._cellArray[ this.indexMinus( indexX, true ) - 1 ][ indexY ] ) neighborhoods++;
        if ( this._cellArray[ this.indexMinus( indexX, true ) - 1 ][ this.indexPlus( indexY, false ) + 1  ] ) neighborhoods++;
        if ( this._cellArray[ this.indexMinus( indexX, true ) - 1 ][ this.indexMinus( indexY, false ) - 1  ] ) neighborhoods++;
        if ( this._cellArray[ this.indexPlus( indexX, true ) + 1 ][ this.indexPlus( indexY, false ) + 1  ] ) neighborhoods++;
        if ( this._cellArray[ this.indexPlus( indexX, true ) + 1 ][ this.indexMinus( indexY, false ) - 1  ] ) neighborhoods++;
        if ( status ) {
          if ( neighborhoods < 2 || neighborhoods > 3 ) {
            status = false;
          }
        } else {
          if ( neighborhoods === 3) {
            status = true;
          }
        }
        return status;
      });
    });
  }

  public detectCoordinates( event ) {
    let cellX = Math.floor( event.offsetX / this._canvasService.cellWidth );
    let cellY = Math.floor( event.offsetY / this._canvasService.cellHeight );
    this._cellArray = this._cellArray.map( ( row, indexX ) => {
      return row.map( ( status, indexY ) => {
        if ( indexX == cellX && indexY == cellY ) {
          return !status;
        }
        return status;
      });
    });
    this.drawCells();
  }

  public drawCells(): void {
    this._canvasService.clearRect();
    this._cellArray.forEach( ( row, indexX ) => {
      row.forEach( ( status, indexY ) => {
        if ( status ) {
          this._canvasService.drawCell( indexX, indexY );
        }
      });
    });
  }

  public indexPlus( index, x = true ) {
    if ( x ) {
      if ( index == ( this._storeOptionsService.options.gridCount - 1 ) ) {
        return -1;
      }
    } else {
      if ( index == ( this._storeOptionsService.options.gridCount - 1 ) ) {
        return -1;
      }
    }
    return index;
  }

  public indexMinus( index, x = true ) {
    if ( index == 0 ) {
      if ( x ) {
        return this._storeOptionsService.options.gridCount;
      } else {
        return this._storeOptionsService.options.gridCount;
      }
    }
    return index;
  }

  public cellsCount(): number {
    let cellsCount = 0;
    this._cellArray.forEach( ( row, indexX ) => {
      row.forEach( ( status, indexY ) => {
        if ( status ) {
          cellsCount++;
        }
      });
    });
    return cellsCount;
  }

  public startLife(): boolean {
    if ( this._storeOptionsService.options.isUniqGenerations ) {
      this._generationsArray.push( this._cellArray );
    }
    let newCellsArray = this.checkLifeStatus();
    let matchStatus = false;
    if ( this._storeOptionsService.options.isExactMatchParentGenerations ) {
      matchStatus = this._compareGeneration( this._cellArray, newCellsArray );
    }
    this._cellArray = newCellsArray;
    let cellsCount = this.cellsCount();
    let existStatus = false;
    if ( this._storeOptionsService.options.isUniqGenerations ) {
      this._generationsArray.forEach( ( generation ) => {
        if ( !existStatus && this._compareGeneration( this._cellArray, generation ) ) {
          existStatus = true;
        }
      });
    }
    if (
      existStatus ||
      matchStatus ||
      cellsCount == 0
    ) {
      this.clearCells();
      if ( this._storeOptionsService.options.isUniqGenerations ) {
        this._generationsArray.push( this._cellArray );
      }
      this._generationsArray = [];
      this.endGeneration = this._cellArray;
      return false;
    } else {
      this.drawCells();
      return true;
    }
  }

  public setFirstGeneration() {
    this.firstGeneration = this._cellArray;
  }

  public getCodeCombinations( generation: Array<Array<boolean>> ): string {
    let code = '';
    this._cellArray.forEach( ( row, indexX ) => {
      row.forEach( ( status, indexY ) => {
        if ( status ) {
          code += indexX + '-' + indexY;
        }
      });
    });
    return code;
  }

  public getImageFromGeneration( generation: Array<Array<boolean>> ): string {
    this._cellArray = generation;
    this.drawCells();
    const image = this._canvasService.getImageFormGeneration();
    this.clearCells();
    return image;
  }

}
