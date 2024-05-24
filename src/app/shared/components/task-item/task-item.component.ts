import { Component, Input, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Task } from '../../../interfaces';
import { SnackBarService, TaskService } from '../../../services';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, JsonPipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  taskService = inject(TaskService);
  snackBar = inject(SnackBarService);

  @Input() task!: Task;


  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId);
    this.snackBar.success('Task removed successfully', 'Close');
  }

  toggleCompletion(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask);
    this.snackBar.success(`Task Marked as ${updatedTask.completed ? 'Completed' : 'Pending'}`, 'Close');
  }
}
