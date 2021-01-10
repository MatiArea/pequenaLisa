import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Url } from '../models/url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = Url;

  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/product`, { headers }).pipe(data => {
      return data
    });
  }

  getAllProductsTable(page: number) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/product/all/${page}`, { headers }).pipe(data => {
      return data
    });
  }

  createProduct(product: any) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.post(`${this.url}/product/new`, product, { headers }).pipe(data => {
      return data
    })
  }

  getOneProduct(id: number) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/product/${id}`, { headers }).pipe(data => {
      return data
    })
  }

  editProduct(product: any) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.put(`${this.url}/product/update`, product, { headers }).pipe(data => {
      return data
    })

  }

  deleteProduct(idProduct: number) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.delete(`${this.url}/product/delete/${idProduct}`, { headers }).pipe(data => {
      return data
    })
  }
}
