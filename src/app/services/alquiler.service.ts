import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Alquiler } from '../models/alquiler';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  private environment: string
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.environment = environment.endpoint;
    this.myAppUrl = 'api';
  }

  getAlquileres(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(`${this.environment}${this.myAppUrl}/alquiler`);
  }

  deleteAlquiler(id: number): Observable<void> {
    const url = `${this.environment}${this.myAppUrl}/alquiler/${id}`;
    return this.http.delete<void>(url);
  }

  createAlquiler(alquiler: Alquiler): Observable<Alquiler> {
    return this.http.post<Alquiler>(`${this.environment}${this.myAppUrl}/alquiler`, alquiler);
  }

  getAlquilerById(id: number): Observable<Alquiler> {
    return this.http.get<Alquiler>(`${this.environment}${this.myAppUrl}/alquiler/${id}`);
  }

  updateAlquiler(id: number, alquiler: Alquiler): Observable<Alquiler> {
    return this.http.put<Alquiler>(`${this.environment}${this.myAppUrl}/alquiler/${id}`, alquiler);
  }
}
