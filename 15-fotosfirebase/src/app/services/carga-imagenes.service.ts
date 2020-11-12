import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) { }

  private guardarImage(image: { nombre: string, url: string }) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`)
      .add(image);
  }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    console.log(imagenes);
  }
}
