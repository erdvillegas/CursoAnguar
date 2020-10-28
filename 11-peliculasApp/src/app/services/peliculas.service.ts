import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../models/cartelera-response';
import { MovieResponse } from '../models/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://api.themoviedb.org/3/';
  private carteleraPage = 1;
  public cargando = false;

  /**
   * Obtiene la lista de parametros
   */
  private get params() {
    return {
      api_key: '4bec0b463e754a5eca4f268104db4010',
      language: 'es-es',
      page: this.carteleraPage.toString()
    };
  }

  getCartelera(): Observable<Movie[]> {

    if (this.cargando) {
      return of([]);
    }

    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}movie/now_playing`, {
      params: this.params
    }).pipe(
      map((resp: CarteleraResponse) => resp.results),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(texto: string) {

    const params = {
      ...this.params,
      page: '1',
      query: texto
    };

    return this.http.get<CarteleraResponse>(`${this.baseUrl}search/movie`, { params }).pipe(
      map(resp => resp.results)
    );
  }

  getPeliculaDetalle(id: string | number) {

    return this.http.get<MovieResponse>(`${this.baseUrl}movie/${id}`, { params: this.params });
  }


  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

}
