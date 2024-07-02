import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroVehiculo } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistrovehiculoService {

  private baseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getRegistrosVehiculos(): Observable<any> {
    const url = this.baseUrl + 'registros';
    return this.http.get(url);
  }

  postRegistroVehiculo(registrovehiculo: RegistroVehiculo): Observable<any> {
    const url = this.baseUrl + 'registrarvehiculo';
    return this.http.post(url, registrovehiculo);
  }
}
