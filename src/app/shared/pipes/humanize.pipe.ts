import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'humanize' })
export class HumanizePipe implements PipeTransform {
  transform(value: string) {
    if (value === '') {
      return value;
    }

    if (value.includes('_')) {
      value = value.split('_').join(' ');
    } else {
      value = value
        .replace(/([^A-Z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][^A-Z])/g, '$1 $2');
      value = value[0].toUpperCase() + value.slice(1);
    }
    return value;
  }
}
