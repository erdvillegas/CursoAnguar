import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,private route: Router) { }

  usuario: UsuarioModel = new UsuarioModel();

  recordarme: boolean = false;

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });

    Swal.showLoading();

    if (form.invalid) { return; }
    this.auth.login(this.usuario)
      .pipe(
        pluck('idToken')
      )
      .subscribe({
        next: data => {
          console.log(data);
          if (this.recordarme) {
            localStorage.setItem('email', this.usuario.email);
            this.route.navigate(['home']);
          }
        },
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: error.error.error.message
          });
        },
        complete: () => {
          console.log('completo');
          Swal.close();
        }
      });

  }

}
