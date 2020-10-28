import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/cartelera-response';


@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[];

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onMoviesClick(movie: Movie) {
    console.log(movie);
    this.route.navigate(['pelicula', movie.id]);
  }

}
