import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {

    this.cargarStorage();
    // const lista1 = new Lista('Recolectar piedras del infinito');
    // const lista2 = new Lista('Heroes por vencer');
    // this.listas.push(lista1, lista2);

  }

  /**
   * Agrega una nueva lista
   * @param titulo Titulo de la lista
   * @returns Id de la lista generada
   */
  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();

    return nuevaLista.id;
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }

  /**
   * Carga una lista por su iD
   * @param id Id de la lista
   */
  cargarLista(id: string | number) {
    id = Number(id);

    return this.listas.find(listaData => listaData.id === id);
  }

  borrarLista(lista: Lista) {
    this.listas = this.listas.filter(listaData => listaData.id !== lista.id);
    this.guardarStorage();
  }
}
