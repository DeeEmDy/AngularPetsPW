import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../user';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal.component';

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
  public showModal: boolean = false; // Para controlar la visibilidad del modal.

  constructor(private readonly userService: UserService, private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
    console.log(this.users);
  }

  createUser(): void {
    if (this.userForm.valid) {
      const user: User = {
        id: 0,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        age: this.userForm.value.age,
        createdAt: new Date().toISOString(),
      };

      this.userService.createUser(user).subscribe({
        next: (createdUser) => {
          this.successMessage = 'Usuario creado con éxito';
          this.errorMessage = null;
          this.userForm.reset();
          this.users = this.userService.getUsers();
          this.closeModal(); // Cerrar el modal después de la creación
        },
        error: (error) => {
          this.errorMessage = 'Hubo un error al crear el usuario';
          this.successMessage = null;
        }
      });
    }
  }

  // Método para abrir el modal
  openModal(): void {
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.showModal = false;
  }
}
