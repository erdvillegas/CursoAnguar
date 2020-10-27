import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];
  public moviesSlidesShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    const pos = (document.documentElement.scrollTop || document.documentElement.scrollTop) + (max * .15);

    if (pos > max) {

      if (this.peliculasServives.cargando) { return; }
      this.peliculasServives.getCartelera().subscribe(movies => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(private peliculasServives: PeliculasService) { }

  ngOnInit(): void {
    this.peliculasServives.getCartelera().subscribe(movies => {
      this.movies = movies;
      this.moviesSlidesShow = movies;
    });
  }

}
