import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  // Cambié el nombre del método a onSubmit
  onSubmit() {
    if (this.userForm.valid) {
      // Aquí llamas al servicio para hacer el POST request a la API en .NET
      console.log(this.userForm.value); // Esto imprime los valores del formulario
      // Emitir un evento o cerrar el modal después de crear el usuario
      this.closeModal();
    }
  }

  closeModal() {
    this.modalClose.emit(); // Emitir un evento para cerrar el modal
  }
}
