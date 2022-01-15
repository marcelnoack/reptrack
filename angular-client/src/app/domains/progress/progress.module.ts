import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './pages/progress/progress.component';
import { ProgressRoutingModule } from './progress-routing.module';

@NgModule({
  declarations: [ProgressComponent],
  imports: [CommonModule, ProgressRoutingModule],
})
export class ProgressModule {}
