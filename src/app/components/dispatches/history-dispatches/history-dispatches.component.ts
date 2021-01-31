import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dispatch, DispatchesService } from '../dispatches.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-history-dispatches',
  templateUrl: './history-dispatches.component.html',
  styleUrls: ['./history-dispatches.component.scss'],
  providers: [
    DispatchesService
  ]
})
export class HistoryDispatchesComponent implements OnInit, OnDestroy {
  constructor(
    private http: DispatchesService
  ) {
  }

  dispatches: Dispatch[] = [];
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.http.getDispathesHistory().pipe(
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
