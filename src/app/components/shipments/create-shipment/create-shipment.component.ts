import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product, ShipmentsService } from '../shipments.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.scss']
})
export class CreateShipmentComponent implements OnInit, OnDestroy {
  constructor(
    private http: ShipmentsService
  ) {
    this.fg = new FormGroup({});
  }

  prods: Product[] = [];
  private destroy$ = new Subject<void>();
  fg: FormGroup;

  ngOnInit(): void {
    this.http.getProducts().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res.status === 200) {
        console.log(res);
        this.prods = res.body;
      }
    });
  }

  makeShip(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
