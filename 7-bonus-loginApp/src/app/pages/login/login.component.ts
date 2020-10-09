import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { pluck } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  usuario: UsuarioModel = new UsuarioModel();

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.invalid) { return; }
    this.auth.login(this.usuario)
      .pipe(
        pluck('idToken')
      )
      .subscribe({
        next: data => console.log(data),
        error: error => console.log(error.error.error.message),
        complete: () => console.log('completo')
      });

  }

}
