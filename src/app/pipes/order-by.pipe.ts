import { Trip } from '../models/trip';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  transform(array: any, orderField: any, orderDir: any): Trip[] {

    // convert order direction into a number
    orderDir = +orderDir;

    // sort the trips array depending on orderField and asc or desc order
    array.sort((a: any, b: any) => {
      const ae = a[orderField];
      const be = b[orderField];

      if (orderDir === 1) {
        if (ae < be) {
          return -1;
        } else if (ae > be) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (ae < be) {
          return 1;
        } else if (ae > be) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    return array;
  }

}


