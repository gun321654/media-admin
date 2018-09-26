import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'open'
})
export class OpenPipe implements PipeTransform {
  // （0、不公开1、公开）
  transform(value: any, args?: any): any {
    switch (value) {
      case 0: return '不公开';
      case 1: return '公开';
    }
  }

}
