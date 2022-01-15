import { Component, OnInit } from '@angular/core';
import { RouteInfoService } from 'src/app/core/services/route-info.service';

@Component({
  selector: 'rpt-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(private routeInfoService: RouteInfoService) {}

  ngOnInit(): void {
    this.routeInfoService.publishRouteInfos({ routeName: 'Calendar' });
  }
}
