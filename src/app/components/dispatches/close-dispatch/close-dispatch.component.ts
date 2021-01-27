import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DispatchesService, Products, productsForDispatch } from '../dispatches.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-close-dispatch',
  templateUrl: './close-dispatch.component.html',
  styleUrls: ['./close-dispatch.component.scss'],
  providers: [DispatchesService]
})
export class CloseDispatchComponent implements OnInit, OnDestroy {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  constructor(
    private activatedRouter: ActivatedRoute,
    private http: DispatchesService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe(param => {
      this.disID = param.id;
    });
  }

  private destroy$ = new Subject<void>();
  disID: number;
  cusID: number;
  prods: Products[] = [];
  prodsForDispatch: productsForDispatch[] = [];
  errFromDB: boolean;

  ngOnInit(): void {
    this.http.getProductsByDispatch(this.disID).pipe(
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 200) {
        this.prods = v.body;
        this.cusID = this.prods[0].cus_id;
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

  closeDispatch(): boolean {
    this.prods.forEach(v => {
      let barcode: string;
      do {
        barcode = prompt(`Введите баркод для товара ${v.product_name}`);
        if (barcode === null) {
          return;
        }
      } while (barcode !== v.product_barcode);
      this.prodsForDispatch.push({
        barcode,
        amount: v.product_amount
      });
    });
    if (this.prodsForDispatch !== []) {
      const emp = JSON.parse(localStorage.getItem('user'));
      this.http.closeDispatch(this.disID, emp.user_id, this.cusID, this.prodsForDispatch).pipe(
        takeUntil(this.destroy$)
      ).subscribe(v => {
        if (v.status === 204) {
          this.router.navigate(['/dispatches']);
        }
      }, error => {
        this.errFromDB = true;
        alert(`
          Message: ${error.message}
          HttpStatusCode: ${error.code}
          Error: ${error.error}
          Description: ${error.description}
        `);
      });
      return true;
    } else if (this.prodsForDispatch === []) {
      alert('Нет товаров к отгрузке');
      return false;
    }
  }

  refuseDispatch(): void {
    const emp = JSON.parse(localStorage.getItem('user'));
    this.http.refuseDispatch(emp.user_id, this.cusID, this.disID).pipe(
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v.status === 204) {
        this.router.navigate(['/dispatches']);
      }
    }, error => {
      this.errFromDB = true;
      alert(`
          Message: ${error.message}
          HttpStatusCode: ${error.code}
          Error: ${error.error}
          Description: ${error.description}
        `);
    });
  }

  printPDF(): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'a4'
    });
    const data = this.pdfTable.nativeElement;
    html2canvas(data).then(canvas => {
      const imgWidth = 275;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      doc.addImage(contentDataURL, 'PNG', 10, 10, imgWidth, imgHeight);
      const out = doc.output('blob');
      window.open(URL.createObjectURL(out));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
