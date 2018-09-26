import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  pure: true
})
export class StatusPipe implements PipeTransform {
  // 1.编辑 2.待审核 3.审核通过 4.审核未通过 5.已指派
  transform(value: any, args?: any): any {
    switch (value) {
      case 1: return '编辑';
      case 2: return '待审核';
      case 3: return '审核通过';
      case 4: return '审核未通过';
      case 5: return '已指派';
    }
  }
}
