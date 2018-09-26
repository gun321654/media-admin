import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatecolor'
})
export class TaskStatecolorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 0: return { 'background': '#fff0f6', 'color': '#eb2f96', 'border-color': '#ffadd2' };
      case 1: return { 'background': '#fff2e8', 'color': '#fa541c', 'border-color': '#ffbb96' };
      case 2: return { 'background': '#fcffe6', 'color': '#a0d911', 'border-color': '#eaff8f' };
      case 3: return { 'background': '#e6f7ff', 'color': '#1890ff', 'border-color': '#91d5ff' };
      case 4: return { 'background': '#f9f0ff', 'color': '#722ed1', 'border-color': '#d3adf7' };
      //f50  2db7f5  87d068  108ee9
      // case 0: return '#f50';
      // case 1: return '#2db7f5';
      // case 2: return '#87d068';
      // case 3: return '#108ee9';
      // case 4: return '#f5222d';


    }
  }

}
