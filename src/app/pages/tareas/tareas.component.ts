import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../model/tarea';
import { CommonModule } from '@angular/common';
import { TareaComponent } from '../tarea/tarea.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, TareaComponent],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.scss',
})
export class TareasComponent implements OnInit {
  constructor(private _tarea_service: TareasService) {}

  id: number = 0;
  _edit: boolean = false;

  items: Tarea[] = [];

  ngOnInit(): void {
    this._edit = false;
    this.id = 0;
    this.load();
  }

  load() {
    this._tarea_service.getAll().subscribe((data) => (this.items = data));
  }

  regresar(event: boolean) {
    this._edit = event;
    this.load();
  }

  edit(id: number) {
    this.id = id;
    this._edit = true;
    console.log('Algo');
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Tarea',
      text: 'Desea Eliminar la Tarea.?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._tarea_service.delete(id).subscribe((data) => {
          Swal.fire({
            title: data.title,
            text: data.text,
            icon: 'success',
          }).then((t) => {
            this.load();
          });
        });
      }
    });
  }
}
