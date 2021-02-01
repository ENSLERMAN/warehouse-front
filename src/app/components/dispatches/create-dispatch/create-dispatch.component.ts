import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment-timezone';
import * as _rollupMoment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { Product } from '../../shipments/shipments.service';
import { DispatchesService } from '../dispatches.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../users/users.service';
import { InformerService } from '../../../service/informer.service';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-create-dispatch',
  templateUrl: './create-dispatch.component.html',
  styleUrls: ['./create-dispatch.component.scss'],
  providers: [
    DispatchesService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class CreateDispatchComponent implements OnInit, OnDestroy {
  private emp: User;

  constructor(
    private http: DispatchesService,
    private router: Router,
    private informer: InformerService,
  ) {
  }

  private destroy$ = new Subject<void>();
  dateGroup = new FormGroup({
    datetimeCtrl: new FormControl('', Validators.required)
  });
  fg = new FormGroup({
    productsSelected: new FormControl(null, Validators.required),
  });
  fgs = new FormGroup({});
  startDate = moment().tz('Europe/Moscow');
  selectedDate: string;
  selectedProds: Product[];
  selectedProdsForDispatch: Product[];
  prods: Product[] = [];
  valid: boolean;

  ngOnInit(): void {
    this.getProducts();
    this.dateGroup.controls.datetimeCtrl.valueChanges.subscribe((v) => {
      this.selectedDate = v.tz('Europe/Moscow').format('YYYY-MM-DDTHH:mm:SSZ');
    });
    this.fg.controls.productsSelected.valueChanges.subscribe(v => {
      this.selectedProds = v;
      const fc = new FormControl('', Validators.required);
      v.forEach(value => {
        this.fgs.addControl(value.barcode, fc);
      });
    });
    this.fgs.valueChanges.subscribe(value => {
      const prods: Product[] = [];
      const keys = Object.keys(value);
      keys.forEach(key => {
        if (value[key] !== '') {
          const prod: Product = this.getItemByBarcode(key, value[key]);
          prods.push(prod);
        } else {
          this.valid = false;
        }
      });
      for (const item of prods) {
        if (item.amount === null || prods.length === 0) {
          this.valid = false;
          return;
        }
      }
      this.valid = true;
      this.selectedProdsForDispatch = prods;
    }, error => {
      this.informer.error(error);
    });
  }

  onSubmit(): void {
    const prods: Product[] = this.selectedProdsForDispatch;
    this.emp = JSON.parse(localStorage.getItem('user'));
    this.http.makeDispatch(this.emp.user_id, this.selectedDate, prods).subscribe(value => {
      if (value.status === 204) {
        this.informer.success('Отгрузка создана!');
        this.router.navigate(['/dispatches']);
      }
    }, error => {
      this.informer.error(error);
    });
  }

  getProducts(): void {
    this.http.getProducts().pipe(takeUntil(this.destroy$)).subscribe(v => {
      if (v.status === 200) {
        this.prods = v.body;
        this.prods.forEach(value => {
          value.old_amount = value.amount;
        });
      }
    }, error => {
      this.informer.error(error);
    });
  }

  getItemByBarcode(barcode: string, amount: number): Product {
    let prod: Product;
    const copyProds = this.selectedProds;
    copyProds.forEach(value => {
      if (value.barcode === barcode) {
        prod = value;
        prod.amount = amount;
      }
    });
    return prod;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
