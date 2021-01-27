import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispatchesService, Products } from '../dispatches.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

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
