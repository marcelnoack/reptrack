import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { SignInComponent } from './domains/auth/pages/signin/signin.component';

const routes: Routes = [
  {
    path: "signin",
    component: SignInComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
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
        path: 'calendar',
        loadChildren: () =>
          import('./domains/calendar/calendar.module').then(
            (m) => m.CalendarModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./domains/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      }
    ]
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
export class AppRoutingModule { }
