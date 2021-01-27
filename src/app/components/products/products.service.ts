import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Product } from '../shipments/shipments.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {
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

  getProductsByID(id): Observable<HttpResponse<Product>> {
    return this.http.get<Product>(`${environment.baseURL}/api/products/getByID?prod_id=${id}`, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  updateProductsByID(
    id: number,
    name: string,
    desc: string,
    price: number
  ): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${environment.baseURL}/api/products/update`, {
      id,
      name,
      desc,
      price
    }, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  deleteProductsByID(id): Observable<HttpResponse<void>> {
    return this.http.get<void>(`${environment.baseURL}/api/products/delete?prod_id=${id}`, {
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }
}
