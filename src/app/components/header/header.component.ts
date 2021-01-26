import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { User } from '../users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  constructor(private router: Router, private authGuard: AuthGuard) {
  }

  user: User;
  visibility = false;

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.authGuard.isLoggedIn() === true) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.visibility = true;
    } else if (this.authGuard.isLoggedIn() === false) {
      this.visibility = false;
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']).finally(() => {
      location.reload(true);
    });
  }
}
