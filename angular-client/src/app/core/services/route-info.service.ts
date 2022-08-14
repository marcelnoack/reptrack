import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type RouteMainActionContext = "Workout" | "WorkoutDetails";
export interface RouteInfo {
  routeName: string;
  mainActionContext?: RouteMainActionContext;
}

@Injectable({
  providedIn: 'root',
})
export class RouteInfoService {
  private _routeChangedSource = new Subject<RouteInfo>();
  public routeChanged$ = this._routeChangedSource.asObservable();

  constructor() {}

  public publishRouteInfos(routeInfo: RouteInfo): void {
    this._routeChangedSource.next(routeInfo);
  }
}
