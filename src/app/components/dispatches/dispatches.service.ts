import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../shipments/shipments.service';
import { environment } from '../../../environments/environment';

// tslint:disable-next-line:class-name
export interface productsForDispatch {
  barcode: string;
  amount: number;
}

export interface Dispatch {
  dispatch_id: number;
  emp_id: number;
  emp_surname?: string;
  emp_name?: string;
  emp_pat?: string;
  emp_fio?: string;
  status_id: number;
  status_name: string;
  dispatch_date: string;
  cus_id: number;
  cus_surname?: string;
  cus_name?: string;
  cus_pat?: string;
  cus_fio?: string;
}

export interface Products {
  cus_id: number;
  product_id: number;
  product_amount: number;
  product_name: string;
  product_des: string;
  product_barcode: string;
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
        return throwError(err);
      })
    );
  }

  makeDispatch(cusID: number, date: string, prods: productsForDispatch[]): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${environment.baseURL}/api/dispatch/new_dispatch`, {
      customer_id: cusID,
      date_create: date.trim(),
      products: prods
    }, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  getDispathes(): Observable<HttpResponse<Dispatch[]>> {
    return this.http.get<Dispatch[]>(`${environment.baseURL}/api/dispatch/all`, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  getDispathesHistory(): Observable<HttpResponse<Dispatch[]>> {
    return this.http.get<Dispatch[]>(`${environment.baseURL}/api/dispatch/history`, {
      observe: 'response'
    }).pipe(
      map(res => {
        res.body.forEach((v) => {
          console.log(v);
          if (v.emp_fio === '' || v.emp_fio === null) {
            v.emp_fio = `${v.emp_surname} ${v.emp_name} ${v.emp_pat}`;
          }
          if (v.cus_fio === '') {
            v.cus_fio = `${v.cus_surname} ${v.cus_name} ${v.cus_pat}`;
          }
        });
        return res;
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  getProductsByDispatch(disID: number): Observable<HttpResponse<Products[]>> {
    return this.http.get<Products[]>(`${environment.baseURL}/api/dispatch/products?dis_id=${disID}`, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  closeDispatch(
    disID: any,
    employeeID: number,
    cusID: number,
    prods: productsForDispatch[]
  ): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${environment.baseURL}/api/dispatch/close_dispatch`, {
      dispatch_id: parseInt(disID, 10),
      emp_id: employeeID,
      customer_id: cusID,
      products: prods
    }, {observe: 'response'}).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  refuseDispatch(
    employee: number,
    customer: number,
    dispatch: any
  ): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${environment.baseURL}/api/dispatch/refuse`, {
      emp_id: employee,
      cus_id: customer,
      dis_id: parseInt(dispatch, 10),
    }, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }
}
