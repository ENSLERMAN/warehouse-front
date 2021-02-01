import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../components/users/users.service';

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
  private baseURL = 'http://backend.enslerman.ru:8060';

  constructor(private http: HttpClient) {
  }

  login(user: string, pass: string): Observable<HttpResponse<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.baseURL}/auth/login`, {
        login: user,
        password: pass
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
    return this.http.post<void>(`${this.baseURL}/auth/register`, {
        login: user,
        surname: surnam,
        name: nam,
        patronymic: pat,
        password: pass
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
