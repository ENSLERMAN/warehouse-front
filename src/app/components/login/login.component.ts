import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private http: HttpService
  ) {
  }

  private destroy$ = new Subject<void>();
  loginForm: FormGroup;
  hide = true;
  error = false;
  user: User;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(4)]),
      pass: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  login(): boolean {
    this.http.login(
      this.loginForm.value.login,
      this.loginForm.value.pass
    ).pipe(
      finalize(() => {
        this.loginForm.setValue({login: '', pass: ''});
      }),
      takeUntil(this.destroy$)
    ).subscribe((res) => {
      if (res.status === 200) {
        if (!(res instanceof HttpErrorResponse)) {
          this.user = res.body;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(this.user));
          const userFIO = window.btoa(this.loginForm.value.login + ':' + this.loginForm.value.pass);
          localStorage.setItem('currentUser', userFIO);
          this.router.navigate(['/main']);
          return true;
        }
      }
    }, () => {
      this.error = true;
    });
    return false;
  }

  register(): void {
    this.router.navigate(['register']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
