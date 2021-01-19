import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      request = request.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `Basic ${currentUser}`
        }
      });
    }
    return next.handle(request);
  }
}
