import { Routes } from '@angular/router';
import { taskExistsGuard } from './core';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/task-list/task-list.component').then(m => m.TaskListComponent),
  },
  {
    path: 'add-task',
    loadComponent: () => import('./modules/add-task/add-task.component').then(m => m.AddTaskComponent)
  },
  {
    path: 'edit-task/:id',
    loadComponent: () => import('./modules/add-task/add-task.component').then(m => m.AddTaskComponent),
    canActivate: [taskExistsGuard]
  }
];
