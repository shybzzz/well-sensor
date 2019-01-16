import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isDefined'
})
export class IsDefinedPipe implements PipeTransform {
  transform(value: any[]): any[] {
    return value && value.filter(v => !!v);
  }
}
