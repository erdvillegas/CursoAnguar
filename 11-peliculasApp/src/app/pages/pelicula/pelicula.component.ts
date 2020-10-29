import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast, CreditsResponse } from 'src/app/models/credits-response';
import { MovieResponse } from 'src/app/models/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieResponse;
  public cast: Cast[] = [];

  constructor(
    private peliculasServices: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.peliculasServices.getPeliculaDetalle(id).subscribe({
      next: movie => {
        if (!movie) {
          this.router.navigate(['/']);
          return;
        }
        this.pelicula = movie;
      },
      complete: () => this.peliculasServices.cargando = false
    });

    this.peliculasServices.getCast(id).subscribe(cast => {
      this.cast = cast.filter(actor => actor.profile_path)
    });
  }

  onRegresar() {
    this.location.back();
  }


}
