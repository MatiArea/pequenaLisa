import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { adminNavItems } from '../../views/admin/_nav';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems;

  constructor(private login: LoginService, private router: Router) {
    var token = sessionStorage.getItem('token');
    var token_decode = jwt_decode(token);
    if (token_decode['admin'] == true) {
      this.navItems = adminNavItems;
    } else if (token_decode['admin'] == false) {
      this.router.navigate(['login']);
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.login.logoutAccoun()
    this.router.navigate(['login']);
  }
}
