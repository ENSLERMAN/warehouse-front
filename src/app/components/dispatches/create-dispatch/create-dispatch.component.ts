import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as _moment from 'moment-timezone';
import * as _rollupMoment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-create-dispatch',
  templateUrl: './create-dispatch.component.html',
  styleUrls: ['./create-dispatch.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class CreateDispatchComponent implements OnInit {
  dateGroup = new FormGroup({
    datetimeCtrl: new FormControl('')
  });
  startDate = moment().tz('Europe/Moscow');
  selectedDate: string;

  constructor() {
  }

  ngOnInit(): void {
    this.dateGroup.controls.datetimeCtrl.valueChanges.subscribe((v) => {
      this.selectedDate = v.tz('Europe/Moscow').format('YYYY-MM-DDTHH:mm:SSZ');
      console.log(this.selectedDate);
    });
  }
}
