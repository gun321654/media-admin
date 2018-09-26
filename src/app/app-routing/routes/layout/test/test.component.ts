

import { Component } from '@angular/core';


@Component({
  selector: 'exe-promise-pipe',
  template: `
   <h4>Promise with AsyncPipeComponent</h4>
   <p>{{ promise | async }}</p>
  `
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
