import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../models/url';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  url: string = Url;

  constructor(private http: HttpClient) {
  }

  getAllExpenses(page:number) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/expense/all/${page}`, { headers }).pipe(expenses => {
      return expenses
    });
  }

  getOneExpense(id:number) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/expense/${id}`, { headers }).pipe(expense => {
      return expense
    });
  }

  createExpense(expense:any){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = expense
    return this.http.post(`${this.url}/expense/new`,body,{headers}).pipe( data => {
      return data
    })
  }  

  deleteExpense(id:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.delete(`${this.url}/expense/delete/${id}`,{ headers }).pipe(data => {
      return data
    })
  }
}
