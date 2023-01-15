import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface PasswortFieldConfig {
  type: string; icon: string; active: boolean
}

@Component({
  selector: 'rpt-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() fG: FormGroup = new FormGroup({});
  @Input() fGName: string = '';
  @Input() fCName: string = '';
  @Input() error: string = '';
  @Input() label: string = '';
  @Input() helperText: string = '';
  @Input() placeholder: string = '';
  @Input() multiline: boolean = false;
  @Input() dense: boolean = false;
  @Input() isPassword: boolean = false;
  @Input() required: boolean = false;

  private _passwordTypes: PasswortFieldConfig[] = [
    { type: 'password', icon: 'visibility', active: true },
    { type: 'text', icon: 'visibility_off', active: false },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public getCurrentPasswordConfig(): PasswortFieldConfig {
    const defaultConfig: PasswortFieldConfig = { type: 'password', icon: 'visibility', active: true };
    return this._passwordTypes.find((pT) => pT.active) || defaultConfig;
  }

  public toggleCurrentPasswordConfig(): void {
    this._passwordTypes = this._passwordTypes.map((pT) => ({...pT, active: !pT.active}));
  }

}
