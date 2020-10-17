import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from "rxjs/operators";
import { HeroesComponent } from '../pages/heroes/heroes.component';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  private url = 'https://login-app-f09fb.firebaseio.com';

  crearHeroe(heroe: HeroeModel) {

    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {

    const heroeTemp = { ...heroe };

    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHereoes() {
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map(this.crearArreglo)
    );
  }

  private crearArreglo(heroesObj: object) {

    const heroes: HeroeModel[] = [];

    if (heroesObj === null) { return []; }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }
}
