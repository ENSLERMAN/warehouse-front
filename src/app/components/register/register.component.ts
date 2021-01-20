import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private http: HttpService) {
  }

  private destroy$ = new Subject<void>();
  registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      patronymic: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  register(): void {
    this.http.register(
      this.registerForm.value.login,
      this.registerForm.value.password,
      this.registerForm.value.name,
      this.registerForm.value.surname,
      this.registerForm.value.patronymic
    ).pipe(
      finalize(() => {
        this.registerForm.setValue({login: '', pass: '', name: '', surname: '', patronymic: ''});
      }),
      takeUntil(this.destroy$)
    ).subscribe((res) => {
      if (res.status === 204) {
        if (!(res instanceof HttpErrorResponse)) {
          alert('Регистрация прошла успешно! Войдите под созданным логином на сайт.');
          this.router.navigate(['/login']);
        }
      }
    }, error => console.log(error));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
