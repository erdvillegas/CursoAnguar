import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from 'src/app/models/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  movie: MovieResponse;

  constructor(private peliculasServices: PeliculasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.peliculasServices.getPeliculaDetalle(id).subscribe({
      next: movie => {
        this.movie = movie;
        console.log(movie);
      },
      complete: () => this.peliculasServices.cargando = false
    });
  }


}
