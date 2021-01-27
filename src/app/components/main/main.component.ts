import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../users/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private router: Router) {
  }

  sections = [
    {
      link: '/shipments',
      access: 3,
      name: 'Поставки',
      des: 'Заполнить новую поставку',
      pic: '/assets/images/shipments.jpg'
    },
    {
      link: '/dispatches',
      access: 3,
      name: 'Отгрузки',
      des: 'Посмотреть будущие отгрузки',
      pic: '/assets/images/dispatches.jpg'
    },
    {
      link: '/reports',
      access: 3,
      name: 'Отчёты',
      des: 'Посмотреть отчёты или запросить новый',
      pic: `/assets/images/reports.jpg`
    },
    {
      link: '/products',
      access: 3,
      name: 'Товары',
      des: 'Посмотреть товары в наличии',
      pic: `/assets/images/products.jpg`
    },
    {
      link: '/dispatches/create_dispatch',
      access: 5,
      name: 'Создать отгрузку',
      des: 'Заполнить новую отгрузку',
      pic: '/assets/images/create_dispatch.jpg'
    },
    {
      link: '/users',
      access: 1,
      name: 'Сотрудники',
      des: 'Посмотреть сотрудников и назначить роли',
      pic: '/assets/images/users.jpg'
    }
  ];
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
