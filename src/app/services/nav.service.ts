import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  navUrl: string = "/qczl/admin/menu/nav"
  constructor(private http: HttpClient) { }
  getNav() {
    return this.http.get(this.navUrl)
  }
}
