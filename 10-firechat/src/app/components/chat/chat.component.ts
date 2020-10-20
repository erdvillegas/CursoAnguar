import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  elemento: any;

  constructor(private chatServices: ChatService) {
    this.chatServices.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }


  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje() {

    if (this.mensaje.length === 0) { return; }

    this.chatServices.agregarMensaje(this.mensaje).then(() => {
      console.log('Mensaje enviado');
      this.mensaje = '';
    }).catch((err) => {
      console.log('Error al enviar', err);
    });
  }
}
