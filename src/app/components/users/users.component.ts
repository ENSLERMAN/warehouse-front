import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role, User, UsersService } from './users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(
    private http: UsersService,
    private router: Router
  ) {
  }

  private destroy$ = new Subject<void>();
  users: User[] = [];
  roles: Role[] = [];
  fg: FormGroup = new FormGroup({
    user: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.http.getUsers().pipe(
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 200) {
        this.users = v.body;
      }
    }, error => {
      alert(`
          Message: ${error.message}
          HttpStatusCode: ${error.code}
          Error: ${error.error}
          Description: ${error.description}
        `);
    });
    this.http.getRoles().pipe(
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 200) {
        this.roles = v.body;
      }
    }, error => {
      alert(`
          Message: ${error.message}
          HttpStatusCode: ${error.code}
          Error: ${error.error}
          Description: ${error.description}
        `);
    });
  }

  changeRole(): void {
    const userID = this.fg.controls.user.value;
    const roleID = this.fg.controls.role.value;
    this.http.changeRole(
      userID,
      roleID
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 204) {
        location.reload(true);
      }
    }, error => {
      alert(`
          Message: ${error.message}
          HttpStatusCode: ${error.code}
          Error: ${error.error}
          Description: ${error.description}
        `);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
