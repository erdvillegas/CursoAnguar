import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(private _router: ActivatedRoute) { 

    this._router.params.subscribe(parametros => {
      console.log('RUTA_PADRE');
      console.log(parametros.id);
    });
  }

  ngOnInit(): void {
  }

}
