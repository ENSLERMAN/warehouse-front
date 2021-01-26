import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product, ShipmentsService, User } from '../shipments.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.scss']
})
export class CreateShipmentComponent implements OnInit, OnDestroy {
  constructor(
    private http: ShipmentsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.fg = new FormGroup({
      productsSelected: new FormControl(null),
      suppSelected: new FormControl(null, Validators.required)
    });
    this.fgs = new FormGroup({});
  }

  prods: Product[] = [];
  selectedProds: Product[] = [];
  selectedProdsForShip: Product[] = [];
  private destroy$ = new Subject<void>();
  fg: FormGroup;
  fgs: FormGroup;
  dynamicForm: FormGroup;
  supps: User[];
  emp: User;

  ngOnInit(): void {
    this.http.getSuppliers().pipe(
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 200) {
        this.supps = v.body;
      }
    });
    this.http.getProducts().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res.status === 200) {
        this.prods = res.body;
      }
    });
    this.fg.controls.productsSelected.valueChanges.subscribe((v: Product[]) => {
      this.selectedProds = v;
      const fc = new FormControl('', Validators.required);
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
    });
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: [''],
      tickets: new FormArray([])
    });
    this.dynamicForm.controls.numberOfTickets.valueChanges.subscribe(e => {
      const numberOfTickets = e;
      if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
          this.t.push(this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', [Validators.required]],
            amount: ['', [Validators.required]],
            price: ['', [Validators.required]],
            barcode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
          }));
        }
      } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
          this.t.removeAt(i);
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.dynamicForm.controls;
  }

  // tslint:disable-next-line:typedef
  get t() {
    return this.f.tickets as FormArray;
  }

  onSubmit(): void {
    if (this.dynamicForm.invalid) {
      return;
    }
    const prods: Product[] = this.selectedProdsForShip.concat(this.dynamicForm.value?.tickets);
    const suppID: number = this.fg.controls.suppSelected.value;
    this.emp = JSON.parse(localStorage.getItem('user'));
    console.log(this.emp);
    this.http.makeShipment(suppID, this.emp.user_id, prods).subscribe(value => {
      if (value.status === 204) {
        this.router.navigate(['/shipments']);
      }
    });
  }

  onClear(): void {
    this.dynamicForm.reset();
    this.fgs.reset();
  }

  getItemByBarcode(barcode: string, amount: number): Product {
    let prod: Product;
    this.selectedProds.forEach(value => {
      if (value.barcode === barcode) {
        prod = value;
        prod.amount = amount;
      }
      delete value.id;
    });
    return prod;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
