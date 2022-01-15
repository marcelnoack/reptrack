import { Component, OnInit } from '@angular/core';
import { RouteInfoService } from 'src/app/core/services/route-info.service';

@Component({
  selector: 'rpt-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  constructor(private routeInfoService: RouteInfoService) {}

  ngOnInit(): void {
    this.routeInfoService.publishRouteInfos({ routeName: 'Progress' });
  }
}
