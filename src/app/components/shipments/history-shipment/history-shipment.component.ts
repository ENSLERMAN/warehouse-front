import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Shipment, ShipmentsService } from '../shipments.service';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-history-shipment',
  templateUrl: './history-shipment.component.html',
  styleUrls: ['./history-shipment.component.scss']
})
export class HistoryShipmentComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private http: ShipmentsService) {
  }

  displayedColumns: string[] = ['ship', 'fio-sup', 'fio-emp', 'date', 'barcode', 'amount'];
  private destroy$ = new Subject<void>();
  source: MatTableDataSource<Shipment> = new MatTableDataSource();
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit(): void {
    this.initShipments();
  }

  initShipments(): void {
    this.http.getShipmentsHistory().pipe(
      takeUntil(this.destroy$),
    ).subscribe(res => {
      this.source.data = res.body;
      this.source.sort = this.sort;
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

  ngAfterViewInit(): void {
    this.source.sort = this.sort;
  }
}
