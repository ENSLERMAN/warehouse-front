import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(4)]),
      pass: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  login(): boolean {
    this.http.login({
      login: this.loginForm.value.login,
      password: this.loginForm.value.pass
    }).pipe(
      finalize(() => {
        this.loginForm.setValue({login: '', pass: ''});
      }),
      takeUntil(this.destroy$)
    ).subscribe((res) => {
      if (res.status === 204) {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/main']);
      }
    }, () => {
      this.error = true;
    });
    return false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
