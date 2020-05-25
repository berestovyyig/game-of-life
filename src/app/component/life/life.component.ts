import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  OnDestroy
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRulesDialog } from '../dialogs/rules-dialog.component';
import { DialogResultDialog } from '../dialogs/result-dialog.component';
import { CanvasService } from '../../services/canvas.service';
import { LifeService } from '../../services/life.service';
import { StoreOptionsService } from '../../services/store-options.service';
import { StoreResultService } from '../../services/store-result.service';

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.less'],
})

export class LifeComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  private _canvas: ElementRef<HTMLCanvasElement>;
  private _lifeGenerateStatus: boolean = false;
  private _timer: number;
  private _stopStatus: boolean = false;
  public countGenerations: number = 0;

  constructor(
    public _dialog: MatDialog,
    private _lifeService: LifeService,
    private _canvasService: CanvasService,
    private _storeOptionsService: StoreOptionsService,
    private _storeResultService: StoreResultService
  ) { }

  ngOnInit(): void {
    this._canvasService.setCanvas( this._canvas );
    this._canvasService.detectSize();
    this._lifeService.generateCellArray();
  }

  public showResults(): void {
    this._dialog.open( DialogResultDialog );
  }

  public get results(): boolean {
    return this._storeResultService.countResults === 0;
  }

  public get gridCount(): number {
    return this._storeOptionsService.options.gridCount;
  }

  public get isExactMatchParentGenerations(): boolean {
    return this._storeOptionsService.options.isExactMatchParentGenerations;
  }

  public get isUniqGenerations(): boolean {
    return this._storeOptionsService.options.isUniqGenerations;
  }

  public changeExactMatchParentGenerations( { checked: status } )  {
    this._storeOptionsService.changeOptions( 'isExactMatchParentGenerations', status );
  }

  public changeUniqGenerations( { checked: status } )  {
    this._storeOptionsService.changeOptions( 'isUniqGenerations' , status );
  }

  public changeForm( { value: form } ) {
    this._storeOptionsService.changeOptions( 'form', form );
    this._lifeService.drawCells();
  }

  public setLineWidth( { value: width } ) {
    this._storeOptionsService.changeOptions( 'lineWidth', width );
    this._lifeService.drawCells();
  }

  public setGridCount( { value: count } ) {
    this._storeOptionsService.changeOptions( 'gridCount', count );
    this._canvasService.detectSize();
    this._lifeService.generateCellArray();
  }

  public get lineWidth(): number {
    return this._storeOptionsService.options.lineWidth;
  }

  public get form(): string {
    return this._storeOptionsService.options.form;
  }

  public get stopLifeStatus(): boolean {
    return this._stopStatus;
  }

  public get lifeGenerateStatus(): boolean {
    return this._lifeGenerateStatus;
  }

  public detectCoordinates( event ) {
    if ( !this._lifeGenerateStatus ) {
      this._lifeService.detectCoordinates( event );
    }
  }

  public clearCells(): void {
    this._lifeService.clearCells();
    this._lifeGenerateStatus = false;
    this._stopStatus = false;
    this.countGenerations = 0;
  }

  public get clearStatus(): boolean {
    return this._lifeService.cellsCount() === 0 ;
  }

  public startLife(): void {
    if ( !this._lifeGenerateStatus ) {
      this.countGenerations = 0;
      this._lifeService.setFirstGeneration();
    }
    this._stopStatus = false;
    this._lifeGenerateStatus = true;
    if ( this._timer ) clearTimeout( this._timer );
    let status = this._lifeService.startLife();
    if ( status ) {
      this.countGenerations += 1;
      this._timer = setTimeout( this.startLife.bind( this ), 300 );
    } else {
      this._storeResultService.setResult( this.countGenerations++ );
      this.showResults();
      this.countGenerations = 0;
      this._lifeGenerateStatus = false;
    }
  }

  public stopLife(): void {
    this._stopStatus = true;
    clearTimeout( this._timer );
  }

  public showRules() {
    this._dialog.open( DialogRulesDialog );
  }

  @HostListener('window:resize', [] )
  public onResize() {
    this._canvasService.clearRect();
    this._canvasService.detectSize();
    this._canvasService.setCanvasSize();
    this._canvasService.createGrid();
    this._lifeService.drawCells();
  }

  public ngOnDestroy(): void {
    this.stopLife();
  }
}
