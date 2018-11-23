

import { Component } from '@angular/core';


@Component({
  selector: 'exe-promise-pipe',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class NzModalCustomComponent {
  promise: string | Promise<string> = "asd";
  constructor() {
    this.promise = this.getPromise();
  }

  getPromise(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise with AsyncPipe complete!');
      }, 5000);
    });
  }
}
