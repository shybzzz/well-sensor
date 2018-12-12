import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'depth'
})
export class DepthPipe implements PipeTransform {
  transform(depth: any, args?: any): any {
    return depth == null || depth === undefined ? null : `${depth} m`;
  }
}
