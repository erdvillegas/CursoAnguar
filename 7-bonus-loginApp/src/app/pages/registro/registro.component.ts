import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import { pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    this.usuario.email = 'erdvillegas@gmail.com';
    this.usuario.nombre = 'erdvillegas';
  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }

    this.auth.nuevoUsuario(this.usuario).pipe(
      tap(console.log),
      pluck('idToken')
    ).subscribe({
      next: (dato) => console.log(dato),
      error: error => console.log(error.error.error.message),
      complete: () => console.log('Completado')
    });
  }

}
