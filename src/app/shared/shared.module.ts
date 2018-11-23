import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

import { PassportComponent } from './../app-routing/routes/passport/passport.component';
import { LoginComponent } from './../app-routing/routes/passport/login/login.component';
import { LayoutComponent } from './../app-routing/routes/layout/layout.component';
import { InsertComponent } from './../app-routing/routes/insert/insert.component';
import { xtylComponent } from '../app-routing/routes/layout/xtyl/xtyl.component';
import { zprwComponent } from '../app-routing/routes/layout/zprw/zprw.component';
import { wdxtComponent } from '../app-routing/routes/layout/wdxt/wdxt.component';
import { xjxtComponent } from '../app-routing/routes/layout/xjxt/xjxt.component';
import { dsxtComponent } from '../app-routing/routes/layout/dsxt/dsxt.component';
import { WdrwComponent } from '../app-routing/routes/layout/wdrw/wdrw.component';
import { RwylComponent } from '../app-routing/routes/layout/rwyl/rwyl.component';
import { RwrlComponent } from '../app-routing/routes/layout/rwrl/rwrl.component';
import { AlltaskComponent } from '../app-routing/routes/layout/alltask/alltask.component';
import { WcjdComponent } from '../app-routing/routes/layout/wcjd/wcjd.component';
import { DqrrwComponent } from '../app-routing/routes/layout/dqrrw/dqrrw.component';

import { YwjrwComponent } from '../app-routing/routes/layout/ywjrw/ywjrw.component';
import { VersionComponent } from '../app-routing/routes/layout/version/version.component';



import { NzModalCustomComponent } from './../app-routing/routes/layout/test/test.component';

import { StatusPipe } from './status.pipe';

import { ImportancePipe } from './importance.pipe';
import { IsInterviewPipe } from './isInterview.pipe';
import { OpenPipe } from './open.pipe';
import { PreAssignmentPipe } from './preAssignment.pipe';
//preAssignment

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/token.interceptor';
// import { AuthService } from './../app-routing/auth.service';
import { CookieModule } from 'ngx-cookie';
import { TaskStatusPipe } from './taskStatus.pipe';
import { TaskStatecolorPipe } from './taskStatecolor.pipe';


@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        RouterModule,
        ReactiveFormsModule,
        CookieModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    declarations: [
        VersionComponent,
        RwrlComponent,
        xjxtComponent,
        zprwComponent,
        YwjrwComponent,
        DqrrwComponent,
        WcjdComponent,
        AlltaskComponent,
        OpenPipe,
        StatusPipe,
        PreAssignmentPipe,
        IsInterviewPipe,
        ImportancePipe,
        NzModalCustomComponent,
        RwylComponent,
        WdrwComponent,
        xtylComponent,
        wdxtComponent,
        dsxtComponent,
        LayoutComponent,
        InsertComponent,
        PassportComponent,
        LoginComponent,
        TaskStatusPipe,
        TaskStatecolorPipe
    ],
    exports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        ReactiveFormsModule
    ]
})
export class SharedModule { }
