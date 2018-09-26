import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TokenService } from './../services/token.service';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';
@Injectable({
  providedIn: AppRoutingModule,
})
export class AuthService implements CanActivate {
  canActivate() {
    // 这里判断登录状态, 返回 true 或 false
    console.log(arguments);
    if (this.TokenService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/passport/login'])
    }

  }
  constructor(private router: Router, private TokenService: TokenService) { }

}
