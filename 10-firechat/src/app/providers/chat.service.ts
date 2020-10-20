import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../Models/mensaje.model';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore,
    public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log('Estado del usuario:', user);

      if (!user) { return; }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login(proveedor: string) {

    if (proveedor === 'google') {
      this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.signInAnonymously();
    }
  }

  logout() {
    this.afAuth.signOut();
    this.usuario = {};
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map(mensajes => {
        this.chats = [];
        for (const mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
      })
    );
  }

  agregarMensaje(texto: string) {

    let mensaje: Mensaje = {
      nombre: 'Dany',
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: new Date().getTime().toString()
    };

    return this.itemsCollection.add(mensaje);
  }
}
