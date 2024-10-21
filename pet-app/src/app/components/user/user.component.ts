import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../user';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule aquí

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // Añadido ReactiveFormsModule
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  public users: Observable<User[]> | undefined;
  public userForm: FormGroup;
  public successMessage: string | null = null;
  public errorMessage: string | null = null;

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
        },
        error: (error) => {
          this.errorMessage = 'Hubo un error al crear el usuario';
          this.successMessage = null;
        }
      });
    }
  }
}
