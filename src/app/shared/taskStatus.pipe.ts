import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {
  // （0、未完成1、未认领2、已完成3、已完结4、退回 
  transform(value: any, args?: any): any {
    switch (value) {
      case 0: return '未开始';
      case 1: return '进行中';
      case 2: return '待确认';
      case 3: return '已完结';
      case 4: return '驳回';
    }
  }
}
