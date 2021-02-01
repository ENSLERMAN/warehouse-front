import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { InformerService } from '../../../service/informer.service';
import { Subject } from 'rxjs';
import { Product } from '../../shipments/shipments.service';

@Component({
  selector: 'app-history-product',
  templateUrl: './history-product.component.html',
  styleUrls: ['./history-product.component.scss'],
  providers: [ProductsService]
})
export class HistoryProductComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRouter: ActivatedRoute,
    private http: ProductsService,
    private router: Router,
    private informer: InformerService,
  ) {
    this.activatedRouter.params.subscribe(param => {
      this.prodID = param.id;
    });
  }

  prodID: number;
  private destroy$ = new Subject<void>();
  prods: Product[];
  spin = false;

  ngOnInit(): void {
    this.spin = true;
    this.http.getProductHistoryByID(this.prodID).pipe(
      finalize(() => {
        this.spin = false;
      }),
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
