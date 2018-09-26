import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: string;
  constructor(private CookieService: CookieService) {
    this.token = CookieService.get("token");
  }
  setToken(token: string, expires: number) {
    // var millisecond = new Date().getTime();
    // var expiresTime = new Date(millisecond + expires);
    this.CookieService.put("token", token, { expires: expires.toString() });
  }
  removeToken() {
    this.CookieService.removeAll();
  }

  getToken() {
    // console.log(this.CookieService.get("token"));
    return this.CookieService.get("token");
  }
}
