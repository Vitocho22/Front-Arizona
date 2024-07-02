import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private environment: string;

  constructor(private http: HttpClient) {
    this.environment = environment.endpoint;
    this.myAppUrl = 'api/users';
  }

  login(user: User): Observable<{ token: string, rol: string }> {
    return this.http.post<{ token: string, rol: string }>(`${this.environment}${this.myAppUrl}/login`, user);
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.environment}${this.myAppUrl}/`, user);
  }

  setSession(authResult: { token: string, rol: string }) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('rol', authResult.rol);
  }

  getRole(): string | null {
    return localStorage.getItem('rol');
  }

  getUser(): { dni: string, rol: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
  }
}
