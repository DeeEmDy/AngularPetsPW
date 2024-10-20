import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: 'users', component: UserComponent }, //Ruta que se va a mostrar en la URL y el componente que se va a cargar.
];
