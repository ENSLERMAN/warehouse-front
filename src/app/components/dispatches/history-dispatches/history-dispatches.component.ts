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
