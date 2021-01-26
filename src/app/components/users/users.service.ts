import { Injectable } from '@angular/core';

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
export class UsersService {
  constructor() {
  }
}
