import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../users/users.service';

export interface Shipment {
  id: number;
  supplier_id: number;
  supplier_surname: string;
  supplier_name: string;
  supplier_pat: string;
  supplier_fio: string;
  employee_id: number;
  employee_surname: string;
  employee_name: string;
  employee_fio: string;
  employee_pat: string;
  date: string;
  product_barcode: string;
  product_amount: number;
}

export interface Product {
  old_amount?: number;
  id: number;
  name: string;
  description: string;
  amount: number;
  price: number;
  barcode: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  private baseURL = 'http://backend.enslerman.ru:8060';

  constructor(private http: HttpClient) {
  }

  getShipments(): Observable<HttpResponse<Shipment[]>> {
    return this.http.get<Shipment[]>(`${this.baseURL}/api/shipments/all`, {
      observe: 'response'
    }).pipe(
      map(res => {
        res.body.forEach((v) => {
          v.supplier_fio = `${v.supplier_surname} ${v.supplier_name} ${v.supplier_pat}`;
          v.employee_fio = `${v.employee_surname} ${v.employee_name} ${v.employee_pat}`;
        });
        return res;
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  getShipmentsHistory(): Observable<HttpResponse<Shipment[]>> {
    return this.http.get<Shipment[]>(`${this.baseURL}/api/shipments/history`, {
      observe: 'response'
    }).pipe(
      map(res => {
        res.body.forEach((v) => {
          v.supplier_fio = `${v.supplier_surname} ${v.supplier_name} ${v.supplier_pat}`;
          v.employee_fio = `${v.employee_surname} ${v.employee_name} ${v.employee_pat}`;
        });
        return res;
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  makeShipment(supID: number, empID: number, prods: Product[]): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${this.baseURL}/api/shipments/new_shipment`, {
      supplier_id: supID,
      emp_id: empID,
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

  getProducts(): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(`${this.baseURL}/api/products/get`, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  getSuppliers(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(`${this.baseURL}/api/user/users?access_id=4`, {
      observe: 'response',
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }
}
