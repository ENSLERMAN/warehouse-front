import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dispatch, DispatchesService } from './dispatches.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { InformerService } from "../../service/informer.service";

@Component({
  selector: 'app-dispatches',
  templateUrl: './dispatches.component.html',
  styleUrls: ['./dispatches.component.scss'],
  providers: [
    DispatchesService
  ],
  styles: [
    `
        .back_color1 {
            background-color: #ecf0ff;
        }

        .back_color2 {
            background-color: #e5ffe9;
        }

        .back_color3 {
            background-color: #ffe4e4;
        }
    `
  ]
})
export class DispatchesComponent implements OnInit, OnDestroy {
  constructor(
    private http: DispatchesService,
    private informer: InformerService,
  ) {
  }

  dispatches: Dispatch[] = [];
  private destroy$ = new Subject<void>();
  spin = false;

  ngOnInit(): void {
    this.spin = true;
    this.http.getDispathes().pipe(
      finalize(() => {
        this.spin = false;
      }),
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 200) {
        this.dispatches = v.body;
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
