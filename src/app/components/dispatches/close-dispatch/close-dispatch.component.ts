import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispatchesService, Products } from '../dispatches.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-close-dispatch',
  templateUrl: './close-dispatch.component.html',
  styleUrls: ['./close-dispatch.component.scss'],
  providers: [DispatchesService]
})
export class CloseDispatchComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRouter: ActivatedRoute,
    private http: DispatchesService
  ) {
    this.activatedRouter.params.subscribe(param => {
      this.disID = param.id;
    });
  }

  private destroy$ = new Subject<void>();
  disID: number;
  prods: Products[] = [];

  ngOnInit(): void {
    this.http.getProductsByDispatch(this.disID).pipe(
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 200) {
        this.prods = v.body;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
