import { Component } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(public chatServices: ChatService) { }

  ingresar(proveedor: string) {
    this.chatServices.login(proveedor);
  }

}
