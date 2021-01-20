import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../service/http.service';

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
      pic: 'https://utmagazine.ru/uploads/content/4cf2db96fc10ecda7f64da5a75275cd5.jpg'
    },
    {
      link: '/dispatches',
      access: 3,
      name: 'Отгрузки',
      des: 'Посмотреть будущие отгрузки',
      pic: 'https://dingyue.ws.126.net/2020/0418/4752d447j00q8yoag000qc000m800m8m.jpg'
    },
    {
      link: '/reports',
      access: 3,
      name: 'Отчёты',
      des: 'Посмотреть отчёты или запросить новый',
      pic: `https://lh3.googleusercontent.com/proxy/IWoAadrcOowzWOPr_ImKZkuiNhfJXwakl4HWIXBAcIGV4OjdPUqQg8KBcPhNnkZXjJJ4vXvgwgu0sZIDRUXGkpOUmzO9jhbmxLkuts3J1SKCNxubrwTV3LUd`
    },
    {
      link: '/dispatches/create_dispatch',
      access: 5,
      name: 'Создать отгрузку',
      des: 'Заполнить новую отгрузку',
      pic: 'https://static5.depositphotos.com/1000765/497/i/600/depositphotos_4977863-stock-photo-3d-small-alarm-clock.jpg'
    },
    {
      link: '/users',
      access: 1,
      name: 'Сотрудники',
      des: 'Посмотреть сотрудников и назначить роли',
      pic: 'https://vidacom.ru/images/team.jpg'
    }
  ];
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
