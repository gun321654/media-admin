import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

interface loginConfig {
  msg: string,
  code: number,
  expire: number,
  token: string
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  captchaUrl = "/qczl/admin/captcha.jpg";
  longinUrl = "/qczl/admin/login";
  uuid: string;
  constructor(private http: HttpClient) { }
  getCaptcha() {
    const params = new HttpParams()
      .set('uuid', this.generateUuid());
    return this.http.get(this.captchaUrl, { params, responseType: 'blob' });
  }
  login(username: string, password: string, captcha: string, uuid: string = this.uuid, ignoreCode: string = "false") {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('captcha', captcha)
      .set('uuid', uuid)
      .set('ignoreCode', ignoreCode);
    return this.http.post<loginConfig>(this.longinUrl, params, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });


  }
  generateUuid() {
    this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    console.log(this.uuid);
    return this.uuid;
  }


}
