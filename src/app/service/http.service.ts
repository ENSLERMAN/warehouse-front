import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../components/users/users.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  options = {
    headers: this.headers,
    observe: 'response' as 'body',
    withCredentials: true
  };

  constructor(private http: HttpClient) {
  }

  login(user: string, pass: string): Observable<HttpResponse<User> | HttpErrorResponse> {
    return this.http.post<User>(`${environment.baseURL}/auth/login`, {
        login: user.trim(),
        password: pass.trim()
      },
      {
        observe: 'response'
      }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  register(user: string, pass: string, nam: string, surnam: string, pat: string): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${environment.baseURL}/auth/register`, {
        login: user.trim(),
        surname: surnam.trim(),
        name: nam.trim(),
        patronymic: pat.trim(),
        password: pass.trim()
      },
      {
        observe: 'response'
      }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }
}
