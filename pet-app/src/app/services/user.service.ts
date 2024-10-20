import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({ //Decorador que permite que la clase pueda ser inyectada en otras clases.
  providedIn: 'root' //Indica que la clase va a ser un servicio que estará disponible en toda la aplicación.
})
export class UserService {
  private readonly base_url = "http://localhost:5034/api/" //URL de la API.
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{ //Método que retorna un Observable es una promesa que brinda una respuesta asincrónica.
    return this.http.get<User[]>(this.base_url+'user');
  }
}
