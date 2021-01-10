import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class Unlogin implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {

        if (sessionStorage.getItem('token') === null) {

            return true;

        } else {
            var token = sessionStorage.getItem('token');
            var token_decode = jwt_decode(token);
            if (token_decode['admin'] === true) {
                
                this.router.navigate(['admin'])
            }else{
                this.router.navigate(['general'])
            }
        }
    }

}