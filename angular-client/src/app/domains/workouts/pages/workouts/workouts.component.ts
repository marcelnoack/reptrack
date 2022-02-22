import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteInfoService } from 'src/app/core/services/route-info.service';

@Component({
  selector: 'rpt-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent implements OnInit {
  constructor(private routeInfoService: RouteInfoService) {}

  ngOnInit(): void {
    this.routeInfoService.publishRouteInfos({ routeName: 'Workouts' });
  }
}