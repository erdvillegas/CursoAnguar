import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noVillegas(control: FormControl): ErrorValidate {

    if (control.value?.toLowerCase() === 'villegas') {
      return {
        noVillegas: true
      };
    }

    return null;
  }

  /**
   * Verifica si el nombre de usuario ya existe
   * @param control Control que se validara
   */
  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    if (control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, rejects) => {

      setTimeout(() => {
        if (control.value === 'erdvillegas') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }

  /**
   * Valida si dos password son iguales
   * @param pass1Name Control de password 1
   * @param pass2Name Control de password 2
   */
  passworsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

}
