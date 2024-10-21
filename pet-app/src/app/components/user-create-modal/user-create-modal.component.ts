import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../user';

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.css']
})
export class UserCreateModalComponent {
  userForm: FormGroup;

  @Output() modalClose = new EventEmitter<void>();
  @Output() userCreated = new EventEmitter<User>();
  @Output() errorOccurred = new EventEmitter<string>(); // Emisor para errores

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
        Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$") // Solo letras y espacios
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$") // Solo letras y espacios
      ]],
      age: ['', [
        Validators.required,
        Validators.min(1), // Edad mínima
        Validators.max(99), // Edad máxima
        Validators.pattern("^[0-9]{1,2}$") // Solo números de 1 a 2 dígitos
      ]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const trimmedFirstName = this.userForm.value.firstName.trim();
      const trimmedLastName = this.userForm.value.lastName.trim();

      if (trimmedFirstName !== this.userForm.value.firstName || trimmedLastName !== this.userForm.value.lastName) {
        this.errorOccurred.emit('No se permiten espacios al final de los campos.');
        return; // Salir de la función
      }

      const newUser: User = {
        id: 0, // El id se asigna en el backend con el autoincrement.
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        age: this.userForm.value.age,
        createdAt: new Date().toISOString()
      };
      this.userCreated.emit(newUser);
      this.userForm.reset();
    } else {
      this.errorOccurred.emit('Por favor, completa el formulario correctamente.'); // Emitir mensaje de error si el formulario no es válido
    }
  }

  closeModal() {
    this.modalClose.emit();
  }
}
