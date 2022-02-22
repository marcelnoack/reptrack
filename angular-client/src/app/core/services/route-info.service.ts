import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface RouteInfo {
  routeName: string;
}

@Injectable({
  providedIn: 'root',
})
export class RouteInfoService {
  private routeChangedSource = new Subject<RouteInfo>();
  public routeChanged$ = this.routeChangedSource.asObservable();

  constructor() {}

  public publishRouteInfos(routeInfo: RouteInfo): void {
    this.routeChangedSource.next(routeInfo);
  }
}
