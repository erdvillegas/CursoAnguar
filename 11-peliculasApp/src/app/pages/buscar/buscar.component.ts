import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  movies: Movie[] = [];
  termino: string = '';

  constructor(private peliculasService: PeliculasService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.termino = params.texto;
      this.peliculasService.buscarPeliculas(this.termino).subscribe(movies => {
        this.movies = movies;
      });
    });
  }

}
