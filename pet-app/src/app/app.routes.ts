import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '', //Para indicar que cuando este en la raiz de la URL, redirija a la ruta dashboard. localhost:4200/dashboard = esto debe cargar el dashboard.
    redirectTo: 'dashboard', //Redirige a la ruta dashboard para cargarlo en la pagina principal o raiz de la URL.
    pathMatch: 'full' //Para indicar que la redireccion es completa.
  },
  { path: 'users', component: UserComponent }, //Ruta que se va a mostrar en la URL y el componente que se va a cargar.
  { path: 'dashboard', component: DashboardComponent} //Ruta que se va a mostrar en la URL y el componente que se va a cargar.
];
