import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import { pluck, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    this.usuario.email = 'erdvillegas@gmail.com';
    this.usuario.nombre = 'erdvillegas';
  }

  onSubmit(form: NgForm) {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });

    Swal.showLoading();

    if (form.invalid) { return; }

    this.auth.nuevoUsuario(this.usuario).pipe(
      tap(console.log),
      pluck('idToken')
    ).subscribe({
      next: (dato) => {
        console.log(dato);
        this.router.navigate(['home']);
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al procesar la solicitud',
          text: error.error.error.message
        });
      },
      complete: () => {
        Swal.close();
      }
    });
  }

}
