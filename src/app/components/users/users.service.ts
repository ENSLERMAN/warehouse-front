import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

export interface User {
  user_id: number;
  surname: string;
  name: string;
  patronymic: string;
  login: string;
  access_id: number;
  access_name: string;
}

export interface Role {
  access_id: number;
  access_name: string;
}

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(`${environment.baseURL}/api/user/all`, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  getRoles(): Observable<HttpResponse<Role[]>> {
    return this.http.get<Role[]>(`${environment.baseURL}/api/user/roles`, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  changeRole(userID: number, roleID: number): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${environment.baseURL}/api/user/update_role`, {
      user_id: userID,
      access_id: roleID,
    }, {observe: 'response'}).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }
}
