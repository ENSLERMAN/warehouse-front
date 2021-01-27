import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dispatch, DispatchesService } from './dispatches.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dispatches',
  templateUrl: './dispatches.component.html',
  styleUrls: ['./dispatches.component.scss'],
  providers: [
    DispatchesService
  ]
})
export class DispatchesComponent implements OnInit, OnDestroy {
  constructor(
    private http: DispatchesService
  ) {
  }

  dispatches: Dispatch[] = [];
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.http.getDispathes().pipe(
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 200) {
        this.dispatches = v.body;
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
