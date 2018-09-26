import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'importance'
})
export class ImportancePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 1: return '普通';
      case 2: return '重要';
    }
  }
}
