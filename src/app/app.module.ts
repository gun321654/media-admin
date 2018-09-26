import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
// import { CookieService, CookieOptionsProvider } from 'ngx-cookie';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
