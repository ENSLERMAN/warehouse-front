import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  barcode: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  private baseURL = 'http://localhost:8080';

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
        alert(err);
        console.log(err);
        return [];
      })
    );
  }

  getProducts(): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(`${this.baseURL}/api/products/get`, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        alert(err);
        return ([]);
      })
    );
  }
}
