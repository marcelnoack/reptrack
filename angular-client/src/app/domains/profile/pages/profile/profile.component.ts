import { Component, OnInit } from '@angular/core';

import { RouteInfoService } from 'src/app/core/services/route-info.service';

@Component({
  selector: 'rpt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private routeInfoService: RouteInfoService) { }

  ngOnInit(): void {
    this.routeInfoService.publishRouteInfos({ routeName: 'Profile' });
  }

}
