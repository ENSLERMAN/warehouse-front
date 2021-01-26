import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Product } from '../shipments/shipments.service';
import { environment } from '../../../environments/environment';

// tslint:disable-next-line:class-name
interface productsForDispatch {
  barcode: string;
  amount: number;
}

@Injectable()
export class DispatchesService {
  constructor(
    private http: HttpClient
  ) {
  }

  getProducts(): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(`${environment.baseURL}/api/products/get`, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        alert(err);
        return throwError(err);
      })
    );
  }

  makeDispatch(cusID: number, date: string, prods: productsForDispatch[]): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${environment.baseURL}/api/dispatch/new_dispatch`, {
      customer_id: cusID,
      date_create: date,
      products: prods
    }, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        alert(err);
        return throwError(err);
      })
    );
  }
}
