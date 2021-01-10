import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Url } from '../models/url';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  url: string = Url;

  constructor(private http: HttpClient) {
  }

  createPurchase(purchase:any){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = purchase

    return this.http.post(`${this.url}/purchase/new`,body,{headers}).pipe( data => {
      return data
    })
  }
  
  getAllPurchase(page:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/purchase/${page}`,{headers}).pipe(purchases =>{
      return purchases
    })
  }

  getOnePurchase(id:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/purchase/${id}`,{headers}).pipe(purchase =>{
      return purchase
    })
  }

  deletePurchase(id:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.delete(`${this.url}/purchase/delete/${id}`,{headers}).pipe(purchase =>{
      return purchase
    })
  }

}
