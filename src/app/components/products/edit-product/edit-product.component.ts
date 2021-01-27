import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../../shipments/shipments.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [ProductsService]
})
export class EditProductComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRouter: ActivatedRoute,
    private http: ProductsService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe(param => {
      this.prodID = param.id;
    });
  }

  product: Product;
  fg: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    barcode: new FormControl(null, [Validators.required])
  });
  private destroy$ = new Subject<void>();
  prodID: number;

  ngOnInit(): void {
    this.http.getProductsByID(this.prodID).pipe(
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 200) {
        this.product = v.body;
        this.fg = new FormGroup({
          name: new FormControl(this.product.name, [Validators.required]),
          description: new FormControl(this.product.description, [Validators.required]),
          amount: new FormControl(this.product.amount, [Validators.required]),
          price: new FormControl(this.product.price, [Validators.required]),
          barcode: new FormControl(this.product.barcode, [Validators.required])
        });
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

  onSave(): void {
    const c = confirm('Вы уверены что обновить товар?');
    if (c === true) {
      this.http.updateProductsByID(
        this.product.id,
        this.fg.controls.name.value,
        this.fg.controls.description.value,
        parseInt(this.fg.controls.price.value, 10)
      ).pipe(
        takeUntil(this.destroy$)
      ).subscribe(v => {
        if (v.status === 204) {
          this.router.navigate(['/products']);
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
  }

  onDelete(): void {
    const c = confirm('Вы уверены что хотите удалить товар?');
    if (c === true) {
      this.http.deleteProductsByID(this.product.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe(v => {
        if (v.status === 204) {
          this.router.navigate(['/products']);
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
