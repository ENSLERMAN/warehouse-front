import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private http: ShipmentsService,
  ) {
    this.fg = new FormGroup({
      productsSelected: new FormControl(null),
    });
    this.fgs = new FormGroup({});
  }

  prods: Product[] = [];
  selectedProds: Product[] = [];
  selectedProdsForShip: Product[] = [];
  private destroy$ = new Subject<void>();
  fg: FormGroup;
  fgs: FormGroup;

  ngOnInit(): void {
    this.http.getProducts().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res.status === 200) {
        this.prods = res.body;
      }
    });
    this.fg.controls.productsSelected.valueChanges.subscribe((v: Product[]) => {
      this.selectedProds = v;
      const fc = new FormControl('');
      v.forEach(value => {
        this.fgs.addControl(value.barcode, fc);
      });
    });
    this.fgs.valueChanges.subscribe(value => {
      const prods: Product[] = [];
      let prod: Product;
      const keys = Object.keys(value);
      keys.forEach(key => {
        if (value[key] !== '') {
          prod = this.getItemByBarcode(key, value[key]);
          prods.push(prod);
        }
      });
      this.selectedProdsForShip = prods;
      console.log(this.selectedProdsForShip);
    });
  }

  makeShip(): void {
  }

  getItemByBarcode(barcode: string, amount: number): Product {
    let prod: Product;
    this.selectedProds.forEach(value => {
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
