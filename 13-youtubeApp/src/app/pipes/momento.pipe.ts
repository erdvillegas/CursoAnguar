import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Key } from 'protractor';

@Pipe({
  name: 'momento'
})
export class MomentoPipe implements PipeTransform {

  transform(value: Date): string {
    return moment(value).fromNow();
  }

}
