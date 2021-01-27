import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Shipment, ShipmentsService } from './shipments.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit, OnDestroy, AfterViewInit {
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
    this.http.getShipments().pipe(
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
