import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../user';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, UserCreateModalComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: Observable<User[]> | undefined;
  public userForm: FormGroup;
  public successMessage: string | null = null;
  public errorMessage: string | null = null;
  public showModal: boolean = false;

  constructor(private readonly userService: UserService, private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  openModal(): void {
    console.log('Abriendo modal desde user.component.ts');
    this.showModal = true;
  }

  closeModal(): void {
    console.log('Cerrando modal desde user.component.ts');
    this.showModal = false;
  }

  createUser(user: User): void {
    this.userService.createUser(user).subscribe({
      next: (createdUser) => {
        this.successMessage = 'Usuario creado con éxito';
        this.errorMessage = null;
        this.users = this.userService.getUsers();
        this.closeModal();

        Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          text: 'El usuario se ha creado con éxito.',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        this.successMessage = null;
        this.errorMessage = error.error?.message || 'Hubo un error al crear el usuario'; // Captura el mensaje del backend

        Swal.fire({
          icon: 'error',
          title: 'Error al crear usuario',
          text: this.errorMessage ?? 'Ocurrió un error inesperado', // Proporciona un valor por defecto si es null o undefined
          confirmButtonText: 'Aceptar',
          timer: 5000, // Tiempo en milisegundos antes de cerrar automáticamente
          timerProgressBar: true,
          willClose: () => {
            this.errorMessage = null; // Limpiar el mensaje de error después de cerrar
          }
        });


      }
    });
  }

  // Manejo de errores desde el modal
  handleError(errorMessage: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      confirmButtonText: 'Aceptar',
      timer: 5000, // Tiempo en milisegundos antes de cerrar automáticamente
      timerProgressBar: true,
    });
  }
}
