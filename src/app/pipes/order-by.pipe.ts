import { Trip } from '../models/trip';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  transform(array: any, orderField: any, orderDir: any): Trip[] {

    orderDir = +orderDir;

    console.log(orderDir);

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




  // console.log(orderField);
  // console.log(orderDir);




  // return trip.sort((a: any, b: any) => {
  //   path.forEach((property) => {
  //     a = a[property];
  //     b = b[property];
  //   });

  // });


}


