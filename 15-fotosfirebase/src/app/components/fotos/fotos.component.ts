import { Component, OnChanges, OnInit } from '@angular/core';
import { Imagen } from '../../models/foto-item';
import { Observable } from 'rxjs';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit, OnChanges {

  imagenes: Observable<Imagen[]>;
  constructor(private _cargaImagenServices: CargaImagenesService) { }

  ngOnInit(): void {
    this.imagenes = this._cargaImagenServices.imagenes;
  }

}