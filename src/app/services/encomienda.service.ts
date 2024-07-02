import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Encomienda } from '../models/encomienda';

@Injectable({
  providedIn: 'root'
})
export class EncomiendaService {
  environment: any;
  myAppUrl: string;

  constructor(private http: HttpClient) {
    this.environment = environment.endpoint;
    this.myAppUrl = 'api';
  }

  getEncomiendas(): Observable<Encomienda[]> {
    return this.http.get<Encomienda[]>(`${this.environment}${this.myAppUrl}/encomienda`);
  }

  deleteEncomienda(id: number): Observable<void> {
    const url = `${this.environment}${this.myAppUrl}/encomienda/${id}`;
    return this.http.delete<void>(url);
  }

  createEncomienda(encomienda: Encomienda): Observable<Encomienda> {
    return this.http.post<Encomienda>(`${this.environment}${this.myAppUrl}/encomiendas`, encomienda);
  }

  getEncomiendaById(id: number): Observable<Encomienda> {
    return this.http.get<Encomienda>(`${this.environment}${this.myAppUrl}/encomienda/${id}`);
  }

  updateEncomienda(id: number, encomienda: Encomienda): Observable<Encomienda> {
    return this.http.put<Encomienda>(`${this.environment}${this.myAppUrl}/encomienda/${id}`, encomienda);
  }
}
