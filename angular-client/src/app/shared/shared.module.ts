import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialBtnComponent } from './material-btn/material-btn.component';

@NgModule({
  declarations: [MaterialBtnComponent],
  imports: [CommonModule],
  exports: [MaterialBtnComponent],
})
export class SharedModule {}
