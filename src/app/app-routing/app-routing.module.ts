import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './routes/passport/login/login.component';
import { PassportComponent } from './routes/passport/passport.component';
import { LayoutComponent } from './routes/layout/layout.component';
import { InsertComponent } from './routes/insert/insert.component';
import { xtylComponent } from './routes/layout/xtyl/xtyl.component';
import { wdxtComponent } from './routes/layout/wdxt/wdxt.component';
import { dsxtComponent } from './routes/layout/dsxt/dsxt.component';
import { RwylComponent } from './routes/layout/rwyl/rwyl.component';
import { WdrwComponent } from './routes/layout/wdrw/wdrw.component';
import { AlltaskComponent } from './routes/layout/alltask/alltask.component';
import { WcjdComponent } from './routes/layout/wcjd/wcjd.component';
import { DqrrwComponent } from './routes/layout/dqrrw/dqrrw.component';
import { YwjrwComponent } from './routes/layout/ywjrw/ywjrw.component';





import { NzModalCustomComponent } from './routes/layout/test/test.component';

import { AuthService } from './auth.service'
import { SharedModule } from './../shared/shared.module'



const routes: Routes = [
  {
    path: '',
    canActivate: [AuthService],
    component: LayoutComponent, children: [
      {
        path: 'xtyl',
        component: xtylComponent,
      },
      {
        path: 'wdxt',
        component: wdxtComponent,
      },
      {
        path: 'dsxt',
        component: dsxtComponent,
      },
      {
        path: 'rwyl',
        component: RwylComponent
      },
      {
        path: 'wdrw',
        component: WdrwComponent
      },
      {
        path: 'test',
        component: NzModalCustomComponent,
      },
      {
        path: 'alltask',
        component: AlltaskComponent,
      },
      {
        path: 'wcjd',
        component: WcjdComponent,
      },
      {
        path: 'dqrrw',
        component: DqrrwComponent,
      },
      {
        path: 'ywjrw',
        component: YwjrwComponent,
      },



    ]
  },
  {//insert
    path: 'insert',
    canActivate: [AuthService],
    component: InsertComponent, children: [
      {
        path: 'xtyl',
        component: xtylComponent,
      },
      {
        path: 'wdxt',
        component: wdxtComponent,
      },
      {
        path: 'dsxt',
        component: dsxtComponent,
      },
      {
        path: 'rwyl',
        component: RwylComponent
      },
      {
        path: 'wdrw',
        component: WdrwComponent
      },
      {
        path: 'test',
        component: NzModalCustomComponent,
      },
      {
        path: 'wcjd',
        component: WcjdComponent,
      },
      {
        path: 'dqrrw',
        component: DqrrwComponent,
      }, {
        path: 'ywjrw',
        component: YwjrwComponent,
      },
    ]

  },
  {
    path: 'passport', component: PassportComponent, children: [
      {
        path: 'login',
        component: LoginComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    SharedModule
  ],
  providers: [AuthService],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
