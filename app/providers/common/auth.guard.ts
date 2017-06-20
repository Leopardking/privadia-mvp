import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('tokenNotExpired',tokenNotExpired())
    //if (tokenNotExpired()) {
    if (localStorage.getItem('id_token')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
