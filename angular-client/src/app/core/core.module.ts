import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { AppBarComponent } from './layout/app-bar/app-bar.component';
import { BottomNavComponent } from './layout/bottom-nav/bottom-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AppBarComponent,
    BottomNavComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule, SharedModule],
  exports: [LayoutComponent, NotFoundComponent],
})
export class CoreModule { }
