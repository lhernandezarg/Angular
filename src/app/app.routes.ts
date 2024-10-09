import { Routes } from '@angular/router';
import { TareasComponent } from './pages/tareas/tareas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: 'tareas', component: TareasComponent },
];
