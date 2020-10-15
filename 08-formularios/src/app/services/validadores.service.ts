import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noVillegas(control: FormControl): { [s: string]: boolean } {

    if (control.value?.toLowerCase() === 'villegas') {
      return {
        noVillegas: true
      };
    }

    return null;
  }
}
