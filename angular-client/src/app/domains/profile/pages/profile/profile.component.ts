import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { RouteInfoService } from 'src/app/core/services/route-info.service';

@Component({
  selector: 'rpt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _routeInfoService: RouteInfoService, private _authService: AuthService) { }

  ngOnInit(): void {
    this._routeInfoService.publishRouteInfos({ routeName: 'Profile' });
  }

  test() {
    this._authService.signOut();
  }

}
