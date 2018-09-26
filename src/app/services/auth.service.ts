import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TokenService } from './token.service';


@Injectable()
export class AuthService implements CanActivate {
  canActivate() {
    // 这里判断登录状态, 返回 true 或 false
    console.log(arguments);
    if (this.TokenService.getToken()) {
      return true;
    } else {
      return false;
    }

  }
  constructor(private TokenService: TokenService) { }

}
