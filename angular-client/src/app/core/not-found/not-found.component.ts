import { Component, OnInit } from '@angular/core';
import { RouteInfoService } from '../services/route-info.service';

@Component({
  selector: 'rpt-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(private routeInfoService: RouteInfoService) {}

  ngOnInit(): void {
    this.routeInfoService.publishRouteInfos({ routeName: 'Not Found' });
  }
}
