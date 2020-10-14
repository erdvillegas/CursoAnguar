import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { Pais } from '../PaisModel';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaises() {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(
      map((resp: Pais[]) => resp.map(pais => ({ nombre: pais.name, codigo: pais.alpha3Code })))
    );
  }
}
