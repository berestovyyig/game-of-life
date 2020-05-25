import {
  Injectable,
  OnInit
} from '@angular/core';

export interface Options {
  isUniqGenerations: boolean;
  isExactMatchParentGenerations: boolean;
  form: string;
  gridCount: number;
  lineWidth: number;
}

@Injectable({
  providedIn: 'root'
})

export class StoreOptionsService implements OnInit {
  public options: Options;
  constructor( ) {
    this.options = this._getOptions();
  }

  ngOnInit(): void { }

  public changeOptions( key: string, value: any ) {
    this.options[ key ] = value;
    this._updateOptions();
  }

  private _updateOptions(): void {
    localStorage.setItem( 'options', JSON.stringify( this.options ) );
  }

  private _getOptions(): Options {
    const options = localStorage.getItem( 'options' );
    if ( options ) {
      return JSON.parse( options );
    }
    return {
      isUniqGenerations: true,
      isExactMatchParentGenerations: true,
      form: 'circle',
      gridCount: 10,
      lineWidth: 2,
    }
  }

}
