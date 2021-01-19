import { Component, OnInit } from '@angular/core';
import { HttpService, User } from '../../service/http.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private http: HttpService) {
  }

  user: User;
  fio: string;

  ngOnInit(): void {
    this.http.getMe().subscribe(
      (res) => {
        if (!(res instanceof HttpErrorResponse)) {
          this.user = res.body;
          this.fio = this.user.surname + ' ' + this.user.name + ' ' + this.user.patronymic;
        }
      },
      (error => alert(error.message))
    );
  }
}
