import { Component, OnInit } from '@angular/core';
// import { SharedModule } from './../../../shared/shared.module';
import { interval, of } from "rxjs";
import { take, map, filter } from "rxjs/operators"


@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent implements OnInit {

  constructor() {
    const ob = of(1, 2, 3, 4, 5).subscribe(console.log)
    // ob.pipe(take(3), map(n => n * 2));


  }

  ngOnInit() {
  }

}
