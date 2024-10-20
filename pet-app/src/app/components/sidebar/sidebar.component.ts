import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouteInfo } from '../../route-info';
import { CommonModule } from '@angular/common';

//Definición de una constante para manejar las rutas de los componentes de la aplicación.
export const ADMIN_ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard', icon: 'fa-solid fa-calendar text-blue', class: '' }, //Ruta del componente Dashboard con su respectivo ícono y título.
  { path: 'users', title: 'Users', icon: 'fa-solid fa-user text-blue', class: '' }, //Ruta del componente Users con su respectivo ícono y título.
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule], //Uso del RouterModule para la navegación y el CommonModule para las directivas estructurales
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

//Clase SidebarComponent que contiene la lógica para el componente sidebar
export class SidebarComponent {
  public menuItems: any[] = []; //Arreglo de objetos que contiene las rutas de los componentes de la aplicación
  public isCollapsed = true;

  constructor(private router: Router){}

  //Método que se ejecuta al iniciar el componente.
  ngOnInit() {
    this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem); //Se filtran las rutas de los componentes de la aplicación.

    this.router.events.subscribe((event) => {
      this.isCollapsed = true; //Se utiliza para saber si el navbar está colapsado o no.
    });
  }
}
