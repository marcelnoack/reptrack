import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'rpt-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() fG: FormGroup = new FormGroup({});
  @Input() fCName: string = '';
  @Input() error: string = '';
  @Input() label: string = '';
  @Input() helperText: string = '';
  @Input() placeholder: string = '';
  @Input() multiline: boolean = false;
  @Input() dense: boolean = false;
  @Input() isPassword: boolean = false;
  @Input() required: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
