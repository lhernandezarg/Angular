import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Tarea } from '../../model/tarea';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.scss',
})
export class TareaComponent implements OnInit {
  constructor(private _tarea_service: TareasService) {}

  @Input() id: number = 0;

  @Output() _regresar: EventEmitter<boolean> = new EventEmitter<boolean>();

  ob: Tarea = {} as Tarea;

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (this.id > 0) {
      this._tarea_service.getById(this.id).subscribe((data) => {
        this.ob = data;
      });
    } else {
      this.ob = {
        id: 0,
        descripcion: '',
        estado: false,
        fecha_creacion: '',
      };
    }
  }

  save() {
    if (this.id == 0) {
      this._tarea_service.create(this.ob).subscribe((data) => {
        Swal.fire({
          title: data.title,
          text: data.text,
          icon: 'success',
        }).then((t) => {
          this.back();
        });
      });
    } else {
      this._tarea_service.update(this.id, this.ob).subscribe((data) => {
        Swal.fire({
          title: data.title,
          text: data.text,
          icon: 'success',
        }).then((t) => {
          this.back();
        });
      });
    }
  }

  back() {
    this._regresar.emit(false);
  }
}
