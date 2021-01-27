import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { catchError } from 'rxjs/operators';

export interface ErrorFromServer {
  message: string;
  code: number;
  error: string;
  description: string;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.auth.logout();
      }
      const errorJSON: ErrorFromServer = {
        message: err.message,
        code: err.error.code,
        error: err.error.error,
        description: err.error.description
      };
      return throwError(errorJSON);
    }));
  }
}
