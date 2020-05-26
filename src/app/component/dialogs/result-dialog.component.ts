import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Result } from '../../services/store-result.service';

export interface DialogResult {
  results: Array<Result>;
}

@Component({
  selector: 'result-dialog',
  templateUrl: 'result-dialog.component.html',
})

export class DialogResultDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogResult
  ) {
    if ( !this.data || this.data && !this.data.results ) {
      console.log( this.data );
      this.data.results = [];
    }
  }
}

