import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pasajero } from '../models/pasajero';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  private environment: string
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.environment = environment.endpoint;
    this.myAppUrl = 'api';
  }
  getPasajeros(): Observable<Pasajero[]> {
    return this.http.get<Pasajero[]>(`${this.environment}${this.myAppUrl}/pasajero`);
  }

  getPasajeroById(id: number): Observable<Pasajero> {
    return this.http.get<Pasajero>(`${this.environment}${this.myAppUrl}/pasajero/${id}`);
  }

  deletePasajero(id: number): Observable<void> {
    const url = `${this.environment}${this.myAppUrl}/pasajero/${id}`;
    return this.http.delete<void>(url);
  }

  createPasajero(pasajero: Pasajero): Observable<Pasajero> {
    return this.http.post<Pasajero>(`${this.environment}${this.myAppUrl}/pasajero`, pasajero);
  }

  updatePasajero(id: number, pasajero: Pasajero): Observable<Pasajero> {
    return this.http.put<Pasajero>(`${this.environment}${this.myAppUrl}/pasajero/${id}`, pasajero);
  }
}
