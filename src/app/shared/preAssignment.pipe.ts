import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preAssignment'
})
export class PreAssignmentPipe implements PipeTransform {
  //（1、互联网2、文稿任务3、采访任务）
  transform(value: any, args?: any): any {
    switch (value) {
      case 1: return '互联网';
      case 2: return '文稿任务';
      case 3: return '采访任务';
    }
  }
}
