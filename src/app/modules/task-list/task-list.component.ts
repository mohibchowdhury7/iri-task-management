import { Component, effect, inject, model } from '@angular/core';
import { TaskService } from '../../services';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from '../../shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Subject, combineLatest, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, JsonPipe, FormsModule, TaskItemComponent, MatProgressSpinnerModule, RouterModule, MatInputModule, MatButtonToggleModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  taskService = inject(TaskService);

  searchTerm = '';
  filterBy = 'all';

  tasks$ = this.taskService.tasks$;

  filterTypes = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
  ];


  searchTasks() {
    this.taskService.filterAndSearchTasks(this.filterBy, this.searchTerm);
  }

  onValueChange() {
    this.taskService.filterAndSearchTasks(this.filterBy, this.searchTerm);
  }
}
