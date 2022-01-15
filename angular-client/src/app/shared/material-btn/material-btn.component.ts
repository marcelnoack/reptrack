import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rpt-material-btn',
  templateUrl: './material-btn.component.html',
  styleUrls: ['./material-btn.component.scss'],
})
export class MaterialBtnComponent implements OnInit {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() mini: boolean = false;
  @Input() border: boolean = false;

  @Output() action = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
