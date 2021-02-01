import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Shipment, ShipmentsService } from './shipments.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InformerService } from '../../service/informer.service';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private http: ShipmentsService,
    private informer: InformerService,
  ) {
  }

  displayedColumns: string[] = ['ship', 'fio-sup', 'fio-emp', 'date', 'barcode', 'amount'];
  private destroy$ = new Subject<void>();
  source: MatTableDataSource<Shipment> = new MatTableDataSource();
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  spin = false;

  ngOnInit(): void {
    this.initShipments();
  }

  initShipments(): void {
    this.spin = true;
    this.http.getShipments().pipe(
      finalize(() => {
        this.spin = false;
      }),
      takeUntil(this.destroy$),
    ).subscribe(res => {
      this.source.data = res.body;
      this.source.sort = this.sort;
    }, error => {
      this.informer.error(error);
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
