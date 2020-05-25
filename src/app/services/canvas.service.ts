import { Injectable, ElementRef } from '@angular/core';
import { StoreOptionsService } from './store-options.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private _canvas: ElementRef<HTMLCanvasElement>;
  public ctx: CanvasRenderingContext2D;
  private _canvasWidth: number;
  private _canvasHeight: number;
  private _cellHeight: number;
  private _cellWidth: number;
  private _lineColor: string = '#69f0ae';
  private _fillCell: string = '#f44336';

  constructor(
    private _storeOptionsService: StoreOptionsService
  ) { }

  private get lineWidth(): number {
    return this._storeOptionsService.options.lineWidth;
  }

  private get gridCount(): number {
    return this._storeOptionsService.options.gridCount;
  }

  public get cellWidth(): number {
    return this._cellWidth;
  }

  public get cellHeight(): number {
    return this._cellHeight;
  }

  public setCanvas( canvas: ElementRef<HTMLCanvasElement> ) {
    this._canvas = canvas;
    this.ctx = this._canvas.nativeElement.getContext('2d' );
    this.detectSize();
  }

  public drawCell( indexX, indexY ) {
    let x = this._cellWidth * indexX + this.lineWidth / 2;
    let y = this._cellHeight * indexY + this.lineWidth / 2;
    switch ( this._storeOptionsService.options.form ) {
      case 'circle':
        this.drawCircleCell( x, y );
        break;
      case 'rectangle':
        this.drawRectangleCell( x, y );
        break;
    }
  }

  public detectSize(): void {
    let parentElement: HTMLElement = this._canvas.nativeElement.parentElement;
    this._canvasWidth = parentElement.offsetWidth - 30;
    if ( window.innerWidth < 991 ) {
      this._canvasHeight = parentElement.offsetWidth - 30;
    } else {
      this._canvasHeight = Math.min( parentElement.offsetHeight, window.innerHeight ) - 30;
    }
    this._canvasWidth = this._canvasHeight = Math.min( this._canvasWidth , this._canvasHeight );
    this._cellWidth = ( this._canvasWidth - this.lineWidth ) / this.gridCount;
    this._cellHeight = ( this._canvasHeight - this.lineWidth ) / this.gridCount;
  }

  public setCanvasSize(): void {
    this.ctx.canvas.width = this._canvasWidth;
    this.ctx.canvas.height = this._canvasHeight;
  }

  public createGrid(): void {
    for ( let i = 1; i < this.gridCount; i++ ) {
      let y = this._cellHeight * i + this.lineWidth / 2;
      this.drawLine( 0, y, this._canvasWidth, y );
    }
    for ( let j = 1; j < this.gridCount; j++ ) {
      let x = this._cellWidth * j + this.lineWidth / 2;
      this.drawLine( x, 0, x, this._canvasHeight );
    }
    this.drawCanvasBorder();
  }

  public drawCanvasBorder() {
    this.drawLine( ( this.lineWidth / 2 ) , ( this.lineWidth / 2 ) , ( this.lineWidth / 2 ), ( this._canvasHeight - ( this.lineWidth / 2 ) ) );
    this.drawLine( ( this.lineWidth / 2 ), ( this.lineWidth / 2 ), ( this._canvasWidth - ( this.lineWidth / 2 ) ), ( this.lineWidth / 2 ) );
    this.drawLine( ( this._canvasWidth - ( this.lineWidth / 2 ) ), ( this.lineWidth / 2 ), ( this._canvasWidth - ( this.lineWidth / 2 ) ), ( this._canvasHeight - ( this.lineWidth / 2 ) ) );
    this.drawLine( ( this.lineWidth / 2 ) , ( this._canvasHeight - ( this.lineWidth / 2 ) ) , ( this._canvasWidth - ( this.lineWidth / 2 ) ), ( this._canvasHeight - ( this.lineWidth / 2 ) ) );
    this.ctx.closePath();
  }

  public drawLine(
    statX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    this.ctx.beginPath();
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this._lineColor;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.moveTo( statX, startY );
    this.ctx.lineTo( endX, endY );
    this.ctx.stroke();
  }

  public clearRect() {
    this.ctx.clearRect( 0, 0, this._canvasWidth, this._canvasHeight );
    this.createGrid();
  }

  public drawCircleCell( x, y ) {
    let radius = ( Math.min( this._cellWidth, this._cellHeight ) * 0.8  - this.lineWidth ) / 2;
    this.ctx.beginPath();
    this.ctx.fillStyle = this._fillCell;
    this.ctx.arc( ( x + ( this._cellWidth / 2 ) ), ( y + ( this._cellHeight / 2 ) ), radius, 0, 2 * Math.PI, false );
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba( 0, 0, 255, 0.5)';
    this.ctx.arc( ( x + ( this._cellWidth / 2 ) ), ( y + ( this._cellHeight / 2 ) ), radius / 3, 0, 2 * Math.PI, false );
    this.ctx.fill();
  }

  public drawRectangleCell( x, y ) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this._fillCell;
    let cellWidth = this._cellWidth - this.lineWidth;
    let cellHeight = this._cellHeight - this.lineWidth;
    this.ctx.rect( ( x + this.lineWidth / 2 + cellWidth * 0.1 ), ( y + this.lineWidth / 2 + cellHeight * 0.1 ), cellWidth * 0.8, cellHeight * 0.8 );
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba( 0, 0, 255, 0.5)';
    let width = cellWidth * 0.8 / 3;
    let height = cellHeight * 0.8 / 3;
    this.ctx.rect( ( x + this.lineWidth / 2 + ( cellWidth / 2 - width / 2 ) ), ( y + this.lineWidth / 2 + ( cellHeight / 2 - height / 2 )  ), width, height );
    this.ctx.fill();
  }

  public getImageFormGeneration(): string {
    return this._canvas.nativeElement.toDataURL();
  }

}
