import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isInterview'
})
export class IsInterviewPipe implements PipeTransform {
  //isInterview （0、否1、是）
  transform(value: any, args?: any): any {
    switch (value) {
      case 0: return '否';
      case 1: return '是';
    }
  }

}
