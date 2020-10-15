import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { retryWhen } from 'rxjs/operators';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
    this.cargarData();
  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return (this.forma.get('nombre').invalid && this.forma.get('nombre').touched);
  }
  get apellidoNoValido() {
    return (this.forma.get('apellido').invalid && this.forma.get('apellido').touched);
  }

  get correoNoValido() {
    return (this.forma.get('correo').invalid && this.forma.get('correo').touched);
  }

  get direccionDistritoNoValido() {
    return (this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched);
  }

  get direccionCiudadNoValido() {
    return (this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched);
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  private crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([
      ])
    });
  }

  cargarData() {
    this.forma.setValue({
      nombre: 'Erik',
      apellido: 'Villegas',
      correo: 'erdvillegas@test.com',
      direccion: {
        distrito: 'Nuevo Leon',
        ciudad: 'Garcia'
      },
      pasatiempos: [
      ]
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.formBuilder.control(['']));
  }

  borrarPasatiempo(indice: number) {
    this.pasatiempos.removeAt(indice);
  }

  guardar() {
    console.log(this.forma);

    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(controles => controles.markAsTouched());
        }


        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    // Posteo de la Info
    this.forma.reset({
      nombre: '',
      apellido: '',
      correo: '',
    })
  }

}
