import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteInfo, RouteInfoService } from '../../services/route-info.service';

@Component({
  selector: 'rpt-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
})
export class AppBarComponent implements OnInit, OnDestroy {
  public currentRouteName: string = '';

  private routeSubscription: Subscription;

  constructor(private routeInfoService: RouteInfoService) {
    this.routeSubscription = this.routeInfoService.routeChanged$.subscribe(
      (routeInfo) => this.changeRouteName(routeInfo)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  private changeRouteName(routeInfo: RouteInfo): void {
    this.currentRouteName = routeInfo.routeName;
  }
}
