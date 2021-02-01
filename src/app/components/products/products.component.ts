import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from './products.service';
import { Product } from '../shipments/shipments.service';
import { Subject } from 'rxjs';
import { InformerService } from '../../service/informer.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(
    private http: ProductsService,
    private informer: InformerService,
  ) {
  }

  private destroy$ = new Subject<void>();
  prods: Product[] = [];

  ngOnInit(): void {
    this.http.getProducts().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res.status === 200) {
        this.prods = res.body;
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
