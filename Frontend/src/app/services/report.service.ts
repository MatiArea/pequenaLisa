import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../models/url';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  url: string = Url;

  constructor(private http: HttpClient) {
  }

  dayReport(date: string) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString,
    })

    return this.http.get(`${this.url}/report/dayreport/${date}`, { headers }).pipe(data => {
      return data
    });
  }

  weekReport(init: string,finish:string) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString,
    })

    return this.http.get(`${this.url}/report/weekreport/${init}/${finish}`, { headers }).pipe(data => {
      return data
    });
  }

  monthReport(month: string) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString,
    })

    return this.http.get(`${this.url}/report/monthreport/${month}`, { headers }).pipe(data => {
      return data
    });
  }
}
