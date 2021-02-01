import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InformerService } from './service/informer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private informer: InformerService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn()) {
      return true;
    }
    this.informer.errorMessage('Ошибка доступа!');
    this.router.navigate(['/login']);
    return false;
  }

  public isLoggedIn(): boolean {
    let status: boolean;
    status = localStorage.getItem('isLoggedIn') === 'true';
    return status;
  }
}
