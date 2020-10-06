import { RouterModule, Routes } from '@angular/router';
import { UsuarioEditarComponent } from './usuario-editar.component';
import { UsuarioNuevoComponent } from './usuario-nuevo.component';

export const USUARIO_ROUTES: Routes = [
  { path: 'nuevo/:otroparametro', component: UsuarioNuevoComponent },
  { path: 'editar', component: UsuarioEditarComponent },
  { path: 'detalle', component: UsuarioEditarComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'editar' }
];
