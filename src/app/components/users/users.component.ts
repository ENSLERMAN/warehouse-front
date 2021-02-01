import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role, User, UsersService } from './users.service';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InformerService } from '../../service/informer.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(
    private http: UsersService,
    private router: Router,
    private informer: InformerService,
  ) {
  }

  private destroy$ = new Subject<void>();
  users: User[] = [];
  roles: Role[] = [];
  fg: FormGroup = new FormGroup({
    user: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
  });
  spin = false;

  ngOnInit(): void {
    this.spin = true;
    this.http.getUsers().pipe(
      finalize(() => {
        this.spin = false;
      }),
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 200) {
        this.users = v.body;
      }
    }, error => {
      this.informer.error(error);
    });
    this.spin = true;
    this.http.getRoles().pipe(
      finalize(() => {
        this.spin = false;
      }),
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 200) {
        this.roles = v.body;
      }
    }, error => {
      this.informer.error(error);
    });
  }

  changeRole(): void {
    this.spin = true;
    const userID = this.fg.controls.user.value;
    const roleID = this.fg.controls.role.value;
    this.http.changeRole(
      userID,
      roleID
    ).pipe(
      finalize(() => {
        this.spin = false;
      }),
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 204) {
        this.informer.success(`Роль успешно изменена!`);
        location.reload(true);
      }
    }, error => {
      this.informer.error(error);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
