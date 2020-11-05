import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from '../../clases/marcador.class';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 25.7250041;
  lng = -100.3156047;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {

    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
    const nuevoMarcador = new Marcador(25.7250041, -100.3156047);
    this.marcadores.push(nuevoMarcador);
  }

  ngOnInit(): void {
  }

  agregarMarcador(evento) {

    const coords: { lat: number, lng: number } = evento.coords;
    this.marcadores.push(new Marcador(coords.lat, coords.lng));
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
    this.guardarStorage();
  }

  guardarStorage() {
    if (localStorage) {
      localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
    }
  }

  borrarMarcador(index: number) {
    this.marcadores.splice(index, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 });
  }

  editarMarcador(marcador: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.descripcion = result.desc;
      this.guardarStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });
    });
  }

}
