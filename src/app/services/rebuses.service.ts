import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rebuses } from '../models/rebuses';

@Injectable({
  providedIn: 'root'
})
export class RebusesService {

  private environment: string
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.environment = environment.endpoint;
    this.myAppUrl = 'api';
  }

  createBuses(ruta: Rebuses): Observable<Rebuses> {
    return this.http.post<Rebuses>(`${this.environment}${this.myAppUrl}/rebuses`, ruta);
  }
  getBuses(): Observable<Rebuses[]> {
    return this.http.get<Rebuses[]>(`${this.environment}${this.myAppUrl}/rebuses`);
  }
  getBusById(id: number): Observable<Rebuses> {
    return this.http.get<Rebuses>(`${this.environment}${this.myAppUrl}/rebuses/${id}`);
  }

  updateBus(id: number, bus: Rebuses): Observable<Rebuses> {
    return this.http.put<Rebuses>(`${this.environment}${this.myAppUrl}/rebuses/${id}`, bus);
  }
  deleteBuses(id: number): Observable<void> {
    const url = `${this.environment}${this.myAppUrl}/rebuses/${id}`;
    return this.http.delete<void>(url);
  }

}
