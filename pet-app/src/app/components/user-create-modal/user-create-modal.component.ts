import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importamos CommonModule para usar *ngIf y *ngFor

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // Asegúrate de importar CommonModule
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.css']
})
export class UserCreateModalComponent {
  userForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Aquí llamas al servicio para hacer el POST request a la API en .NET
      console.log(this.userForm.value); // Esto imprime los valores del formulario
    }
  }
}
