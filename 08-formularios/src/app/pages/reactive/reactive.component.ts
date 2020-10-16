import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private formBuilder: FormBuilder, private validador: ValidadoresService) {
    this.crearFormulario();
    this.cargarData();
    this.crearListeners();
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
  
  get usuarioNoValido() {
    return (this.forma.get('usuario').invalid && this.forma.get('usuario').touched);
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

  get pass1NoValido() {
    return (this.forma.get('pass1').invalid && this.forma.get('pass1').touched);
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }


  private crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validador.noVillegas]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['',, this.validador.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([])
    }, {
        validators: this.validador.passworsIguales('pass1', 'pass2')
    });
  }

  crearListeners() {
    // this.forma.valueChanges.subscribe(console.log);
    // this.forma.statusChanges.subscribe(console.log);
    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }

  cargarData() {
    this.forma.setValue({
      nombre: 'Erik',
      apellido: 'Villegas',
      correo: 'erdvillegas@test.com',
      usuario: '',
      direccion: {
        distrito: 'Nuevo Leon',
        ciudad: 'Garcia'
      },
      pass1: '',
      pass2: '',
      pasatiempos: []
    });

    ['Jugar', 'Leer'].forEach(p => this.pasatiempos.push(this.formBuilder.control([p])));
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
