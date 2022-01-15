import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteInfoService } from 'src/app/core/services/route-info.service';

@Component({
  selector: 'rpt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private routeInfoService: RouteInfoService) {}

  ngOnInit(): void {
    this.routeInfoService.publishRouteInfos({ routeName: 'Home' });
  }

  ngOnDestroy(): void {}
}
