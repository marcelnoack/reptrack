import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialBtnComponent } from './material-btn/material-btn.component';
import { InputComponent } from './input/input.component';
import { BtnComponent } from './btn/btn.component';

@NgModule({
  declarations: [MaterialBtnComponent, InputComponent, BtnComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MaterialBtnComponent, InputComponent],
})
export class SharedModule {}
