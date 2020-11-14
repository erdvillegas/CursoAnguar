import { expressionType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FileItem } from '../models/file-item';
import { Imagen } from '../models/foto-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';
  private imagenCollection: AngularFirestoreCollection<Imagen>;
  imagenes: Observable<Imagen[]>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.imagenCollection = this.db.collection<Imagen>(`/${this.CARPETA_IMAGENES}`);
    this.imagenes = this.imagenCollection.valueChanges();
  }

  private guardarImage(imagen: Imagen) {
    this.imagenCollection.add(imagen);
  }

  // cargarImagenesFirebase(imagenes: FileItem[]) {
  //   const storageRef = this.storage.storage.ref();
  //   for (const item of imagenes) {
  //     item.estaSubiendo = true;
  //     if (item.progreso >= 100) {
  //       continue;
  //     } else {
  //       // const uploadTask = this.storage.upload(storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)., item.archivo);
  //       const uploadTask =
  //         this.storage.storage.ref().child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);
  //       uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //         (snapshot) => item.progreso = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
  //         (error) => console.error('Error al subir', error),
  //         () => {
  //           console.log('Imagen cargada correctamene');
  //           item.estaSubiendo = false;
  //           this.guardarImage({ nombre: item.nombreArchivo, url: item.url });

  //         }
  //       );
  //     }

  //   }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    const storageRef = this.storage.storage.ref();
    for (const item of imagenes) {
      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      } else {
        const filePath = `${this.CARPETA_IMAGENES}/${item.nombreArchivo}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, item.archivo);

        task.snapshotChanges().subscribe({
          next: snapshot => item.progreso = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
          error: err => console.error('Error al subir', err),
          complete: () => {
            console.log('Imagen cargada correctamente');
            item.estaSubiendo = false;
            fileRef.getDownloadURL().subscribe({
              next: downloadURL => item.url = downloadURL,
              complete: () => {
                const imagenTmp: Imagen = {
                  nombre: item.nombreArchivo,
                  url: item.url
                };
                this.guardarImage({ nombre: item.nombreArchivo, url: item.url });
              }
            });
          }
        });
      }
    }
  }
}
