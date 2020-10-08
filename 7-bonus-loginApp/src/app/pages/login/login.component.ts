import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  usuario: UsuarioModel = new UsuarioModel();

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.invalid) { return; }
    
    console.log(form);
    console.log(this.usuario);

  }

}
