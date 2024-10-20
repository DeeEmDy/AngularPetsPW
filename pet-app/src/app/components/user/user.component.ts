import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../user';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  public users: Observable<User[]> | undefined;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.users = this.userService.getUsers();
    console.log(this.users)
  }
}
