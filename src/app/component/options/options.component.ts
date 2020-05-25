import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.less']
})
export class OptionsComponent implements OnInit {
  @Input() isUniqGenerations: boolean;
  @Input() isExactMatchParentGenerations: boolean;
  @Output() detectUniqGenerationsStatus = new EventEmitter<boolean>();
  @Output() detectExactMatchParentGenerationsStatus = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {

  }

  public changeExactMatchParentGenerationsStatus( { checked: checked } ) {
    this.detectUniqGenerationsStatus.emit( checked );
  }

  public changeUniqGenerationsStatus( { checked: checked } ) {
    this.detectUniqGenerationsStatus.emit( checked );
  }

}
