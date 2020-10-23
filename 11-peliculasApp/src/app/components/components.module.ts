import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';

//Terceros
import { SlideshowComponent } from './slideshow/slideshow.component';
import { RatingModule } from 'ng-starrating';


@NgModule({
  declarations: [NavbarComponent, SlideshowComponent, PeliculasPosterGridComponent],
  imports: [
    CommonModule,
    RouterModule,
    RatingModule
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    RatingModule,
    PeliculasPosterGridComponent
  ]
})
export class ComponentsModule { }
