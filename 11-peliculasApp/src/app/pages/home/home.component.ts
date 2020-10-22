import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];

  constructor(private peliculasServives: PeliculasService) {
    this.peliculasServives.getCartelera().subscribe(resp => {
      this.movies = resp.results;
    });
  }

  ngOnInit(): void {
  }

}
