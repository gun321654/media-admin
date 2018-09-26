import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { SharedModule } from './../../../shared/shared.module';
import { NavService } from './../../../services/nav.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TokenService } from './../../../services/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  nav: Array<any> = [];

  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  constructor(private router: Router, private TokenService: TokenService, private NavService: NavService, public http: HttpClient) { }

  ngOnInit() {
    // this.http.get("/qczl/admin/menu/nav").subscribe(console.log)
    this.NavService.getNav().subscribe((json: any) => {
      console.log("nav", json)
      this.nav = json.menuList;
    })
  }
  logout() {
    this.TokenService.removeToken();
    this.router.navigate(['/passport/login'])
  }
}
