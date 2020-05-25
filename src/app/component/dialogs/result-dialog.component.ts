import { Component } from '@angular/core';
import { StoreResultService, Result } from '../../services/store-result.service';


@Component({
  selector: 'result-dialog',
  templateUrl: 'result-dialog.component.html',
})

export class DialogResultDialog {
  constructor(
    private _storeResultService: StoreResultService
  ) {
  }
  public get results(): Array<Result> {
    return this._storeResultService.results.reverse();
  }
}
