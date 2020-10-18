import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {


  heroe = new HeroeModel();

  constructor(private route: ActivatedRoute, private heroesServices: HeroesService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroesServices.getHereoe(id).subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm) {

    if (!form.valid) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesServices.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesServices.crearHeroe(this.heroe);
    }

    peticion.subscribe({
      next: resp => console.log(resp),
      error: err => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Algo pasó al actualizar la información',
          icon: 'error',
          allowOutsideClick: false
        });
      },
      complete: () => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizó corrrectamente',
          icon: 'success',
          allowOutsideClick: false
        });
      }
    });

  }

}
