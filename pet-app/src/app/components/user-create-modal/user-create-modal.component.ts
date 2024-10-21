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

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = {
        id: 0, //El id se asigna en el backend con el autoincrement.
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        age: this.userForm.value.age,
        createdAt: new Date().toISOString()
      };
      this.userCreated.emit(newUser);
      this.userForm.reset();
    }
  }

  closeModal() {
    this.modalClose.emit();
  }
}
