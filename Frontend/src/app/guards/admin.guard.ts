import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";


@Injectable({
    providedIn: 'root'
})
export class IsAdmin implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        var token = sessionStorage.getItem('token');
        var token_decode = jwt_decode(token);
        if (token_decode['admin'] == true) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}
