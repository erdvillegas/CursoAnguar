import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando: boolean = true;

  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {
    this.heroesServices.getHereoes().subscribe({
      next: resp => this.heroes = resp,
      complete: () => this.cargando = false
    });
  }

  borrarHeroe(heroe: HeroeModel, index: number) {

    Swal.fire({
      title: '¿Estás Seguro?',
      text: `Estas seguro que deseas borrar a ${heroe.nombre}`,
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroesServices.borrarHeroe(heroe.id).subscribe({
          next: resp => this.heroes.splice(index)
        });
        Swal.fire('Cambios aplicados!', '', 'success');
      }
    });
  }
}
