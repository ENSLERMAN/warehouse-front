import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
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

  login(data: any): Observable<HttpResponse<object> | HttpErrorResponse> {
    return this.http.post<HttpResponse<object> | HttpErrorResponse>(`${this.baseURL}/auth/login`, data, {observe: 'response'});
  }

  getMe(): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.baseURL}/user/me`, {observe: 'response'});
  }
}
