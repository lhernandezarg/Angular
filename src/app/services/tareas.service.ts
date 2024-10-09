import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from '../model/tarea';
import { SuccessResponse } from '../responses/responses';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  constructor(private http: HttpClient) {}

  url: string = `http://localhost:8080/api/v1/tareas`;

  create(ob: Tarea) {
    return this.http.post<SuccessResponse>(`${this.url}/`, ob);
  }
  update(id: number, ob: Tarea) {
    return this.http.put<SuccessResponse>(`${this.url}/${id}`, ob);
  }

  getAll() {
    return this.http.get<Tarea[]>(`${this.url}/`);
  }

  getById(id: number) {
    return this.http.get<Tarea>(`${this.url}/${id}`);
  }

  delete(id: number) {
    return this.http.delete<SuccessResponse>(`${this.url}/${id}`);
  }
}
