import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  user_id: number;
  surname: string;
  name: string;
  patronymic: string;
  login: string;
  access_id: number;
  access_name: string;
}

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
  private baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  login(user: string, pass: string): Observable<HttpResponse<object>> {
    return this.http.post<HttpResponse<object>>(`${this.baseURL}/auth/login`, {
        login: user,
        password: pass
      },
      {
        observe: 'response'
      });
  }

  getMe(): Observable<HttpResponse<User> | HttpErrorResponse> {
    return this.http.get<User>(`${this.baseURL}/api/user/me`, {observe: 'response'});
  }
}
