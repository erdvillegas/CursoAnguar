import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ERR_PLUGIN_NOT_INSTALLED } from '@ionic-native/core/decorators/common';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  listas: Lista[] = [];

  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosServices: DeseosService, private router: Router, public alertController: AlertController) {
    this.listas = this.deseosServices.listas;
  }

  ngOnInit() { }

  listaSeleccionada(lista: Lista) {

    console.log(this.terminada);
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista) {
    this.deseosServices.borrarLista(lista);
  }

  async editarLista(lista: Lista) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nomnre de la lista',
          value: lista.titulo
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
          this.lista.closeSlidingItems();
        }
      },
      {
        text: 'Actualizar',
        handler: (data: Lista) => {
          if (data.titulo.length === 0) {
            return;
          }
          lista.titulo = data.titulo;
          this.deseosServices.guardarStorage();
          this.lista.closeSlidingItems();
        }
      }
      ]
    });

    alert.present();
  }
}
