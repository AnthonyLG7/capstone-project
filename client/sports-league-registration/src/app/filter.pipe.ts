import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue): any {
    console.log(`value: ${value}`);
    console.log('searchdValue: ' + searchValue);
    if (!searchValue) return value;
    return value.filter((v) => v.name.indexOf(searchValue) > -1 || v.size.indexOf(searchValue) > -1)

  }

}