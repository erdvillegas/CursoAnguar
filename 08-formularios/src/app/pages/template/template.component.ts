import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisModel } from 'src/app/Pais';
import { Pais } from 'src/app/PaisModel';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor(private paiseService: PaisService) { }

  usuario = {
    nomnbre: 'Erik',
    apellido: 'Villegas',
    correo: 'vi.erik@test.com',
    pais: 'MEX',
    genero: 'Masculino'
  };

  paises: PaisModel[];

  ngOnInit(): void {
    this.paiseService.getPaises().subscribe((resp: PaisModel[]) => {
      this.paises = resp;
      this.paises.unshift({
        nombre: '[Seleccione un País]',
        codigo: ''
      })
    });
  }

  guardar(forma: NgForm): void {
    console.log(forma);

    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
  }

}
