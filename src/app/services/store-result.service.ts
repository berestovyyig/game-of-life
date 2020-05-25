import { Injectable } from '@angular/core';
import { LifeService } from './life.service';

export interface Result {
  codeCombinations: string;
  countGenerations: number;
  imageStart: string;
  imageEndGenerations: string;
}

@Injectable({
  providedIn: 'root'
})

export class StoreResultService {
  private _results: Array<Result>;
  constructor(
    private _lifeService: LifeService
  ) {
    this._results = this._getResults();
  }

  public get results(): Array<Result> {
    return this._results;
  }

  public get countResults(): number {
    return this._results.length;
  }

  public setResult( countGenerations ): void {
    const codeCombinations = this._lifeService.getCodeCombinations( this._lifeService.firstGeneration );
    const imageStart = this._lifeService.getImageFromGeneration( this._lifeService.firstGeneration );
    const imageEndGenerations = this._lifeService.getImageFromGeneration( this._lifeService.endGeneration );
    const result = {
      codeCombinations: codeCombinations,
      countGenerations: countGenerations,
      imageStart: imageStart,
      imageEndGenerations: imageEndGenerations
    };
    if ( this._results.length >= 10 ) {
      this._results.shift();
    }
    this._results.push( result );
    this._updateResult();
    this._lifeService.endGeneration = [];
    this._lifeService.firstGeneration = [];
  }

  protected _updateResult(): void {
    localStorage.setItem( 'results', JSON.stringify( this._results ) );
  }

  private _getResults(): Array<Result> {
    const result = localStorage.getItem( 'results' );
    if ( result ) {
      return JSON.parse( result );
    }
    return [];
  }

}
