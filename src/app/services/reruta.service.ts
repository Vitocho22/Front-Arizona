import { Injectable } from '@angular/core';
import { Ruta } from '../models/reruta';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RerutaService {

  private environment: string
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.environment = environment.endpoint;
    this.myAppUrl = 'api';
  }

  createRuta(ruta: Ruta): Observable<Ruta> {
    return this.http.post<Ruta>(`${this.environment}${this.myAppUrl}/rerutas`, ruta);
  }
  getRuta(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(`${this.environment}${this.myAppUrl}/rerutas`);
  }
  getRutaById(id: number): Observable<Ruta> {
    return this.http.get<Ruta>(`${this.environment}${this.myAppUrl}/rerutas/${id}`);
  }

  deleteRuta(id: number): Observable<void> {
    const url = `${this.environment}${this.myAppUrl}/rerutas/${id}`;
    return this.http.delete<void>(url);
  }

  updateRuta(id: number, ruta: Ruta): Observable<Ruta> {
    return this.http.put<Ruta>(`${this.environment}${this.myAppUrl}/rerutas/${id}`, ruta);
  }
}
