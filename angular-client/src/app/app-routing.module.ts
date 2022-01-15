import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./domains/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./domains/workouts/workouts.module').then(
        (m) => m.WorkoutsModule
      ),
  },
  {
    path: 'progress',
    loadChildren: () =>
      import('./domains/progress/progress.module').then(
        (m) => m.ProgressModule
      ),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./domains/calendar/calendar.module').then(
        (m) => m.CalendarModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
