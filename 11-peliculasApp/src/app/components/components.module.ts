import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';

//Terceros
import { SlideshowComponent } from './slideshow/slideshow.component';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../pipes/pipes.module';
import { LoadingComponent } from './loading/loading.component';
import { CastSlideShowComponent } from './cast-slide-show/cast-slide-show.component';


@NgModule({
  declarations: [NavbarComponent, SlideshowComponent, PeliculasPosterGridComponent, LoadingComponent, CastSlideShowComponent],
  imports: [
    CommonModule,
    RouterModule,
    RatingModule,
    PipesModule
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    RatingModule,
    PeliculasPosterGridComponent,
    LoadingComponent,
    CastSlideShowComponent
  ]
})
export class ComponentsModule { }
