import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { UserCreateModalComponent } from './components/user-create-modal/user-create-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, FooterComponent, UserCreateModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pet-app';
  showModal = false; // Controla la visibilidad del modal.

  // Método para abrir el modal
  openModal() {
    console.log('Abriendo el modal desde app.component.ts');
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeModal() {
    console.log('Cerrando el modal desde app.component.ts');
    this.showModal = false;
  }
}
