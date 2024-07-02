import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Personal } from '../models/personal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private environment: string
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.environment = environment.endpoint;
    this.myAppUrl = 'api';
  }

  createPersonal(personal: Personal): Observable<Personal> {
    return this.http.post<Personal>(`${this.environment}${this.myAppUrl}/personal`, personal);
  }

  getPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(`${this.environment}${this.myAppUrl}/personal`);
  }

  deletePersonal(id: number): Observable<void> {
    const url = `${this.environment}${this.myAppUrl}/personal/${id}`;
    return this.http.delete<void>(url);
  }

  getPersonalById(id: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.environment}${this.myAppUrl}/personal/${id}`);
  }

  updatePersonal(id: number, personal: Personal): Observable<Personal> {
    return this.http.put<Personal>(`${this.environment}${this.myAppUrl}/personal/${id}`, personal);
  }
}
