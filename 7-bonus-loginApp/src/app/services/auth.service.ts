import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { strictEqual } from 'assert';
import { map, pluck } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyCNHrBPJAnTy2jNFhWMWnyMy3HwWvji5pM';

  userToken: string = null;

  constructor(private http: HttpClient) {
    this.leerToken();
  }


  logout() {
    localStorage.removeItem('token');
  }

  /**
   * Login hacia el backend
   * @param usuario Datos de usuario
   */
  login(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  /**
   * Crea un nuevo usuario
   * @param usuario Datos de usuario
   */
  nuevoUsuario(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  /**
   * Guardar el token en localstorage
   * @param idToken Id del token
   */
  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());

  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

  /**
   * Revisa si la el token se encuentra guardado
   */
  estaAutenticado(): boolean {

    if (this.userToken.length > 2) {
      return false;
    } else {
      const expira = Number(localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);

      if (expiraDate > new Date()) {
        return true;
      } else {
        return false;
      }
    }
  }
}
