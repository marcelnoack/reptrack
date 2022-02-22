import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { WorkoutDetailsComponent } from './pages/workout-details/workout-details.component';


@NgModule({
  declarations: [
    WorkoutsComponent,
    WorkoutDetailsComponent
  ],
  imports: [
    CommonModule,
    WorkoutsRoutingModule
  ]
})
export class WorkoutsModule { }
