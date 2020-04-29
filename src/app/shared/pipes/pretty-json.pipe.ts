import { Pipe, PipeTransform } from '@angular/core';
import { HumanizePipe } from './humanize.pipe';

const openTag = '<div>';
const closeTag = '</div>';

@Pipe({
  name: 'prettyJson',
})
export class PrettyJsonPipe implements PipeTransform {
  private _humanise: HumanizePipe = new HumanizePipe();

  transform(value: any, ...args: any[]) {
    if (value != null && value !== undefined) {
      const keys =
        args && args.length > 0
          ? args
          : Object.keys(value).filter((i) => i.toUpperCase() !== 'ID');
      return `<pre>${this.decoupleObject(value, keys, 0)}</pre>`;
    } else {
      return '';
    }
  }

  private nextIndentLevel = (current: number) => current + 4;

  private decoupleObject = (obj: any, keys: string[], indentLevel: number) => {
    let returnValue = openTag;
    const indentation = Array(indentLevel).fill(' ').join('');
    keys.forEach((key) => {
      let title =
        openTag + indentation + this._humanise.transform(key).trim() + ': ';
      let value = obj[key];
      let error = false;
      if (value != null && value !== undefined) {
        const valueType = typeof obj[key];
        switch (valueType) {
          case 'object':
            if (value instanceof Array) {
              if (value.length <= 0) {
                error = true;
              } else {
                title += '[' + closeTag;
                value = this.decoupleObject(
                  value,
                  Object.keys(value).filter((i) => i.toLowerCase() !== 'id'),
                  this.nextIndentLevel(indentLevel)
                );
                value += openTag + indentLevel + ']' + closeTag;
              }
            } else {
              if (Object.keys(value).length <= 0) {
                error = true;
              } else {
                title += '-' + closeTag;
                value = this.decoupleObject(
                  value,
                  Object.keys(value).filter((i) => i.toLowerCase() !== 'id'),
                  this.nextIndentLevel(indentLevel)
                );
              }
            }
            break;
          case 'string':
            if (key.toLowerCase().includes('date') && Date.parse(value)) {
              value = new Date(value).toLocaleString(undefined, {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
            }
            break;
          default:
            break;
        }
        if (!error) {
          returnValue += title + value + closeTag;
        }
      }
    });
    returnValue += closeTag;
    return returnValue;
  }
}
