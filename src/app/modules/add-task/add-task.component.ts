import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { Task } from '../../interfaces';
import { SnackBarService, TaskService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  route = inject(ActivatedRoute);
  snackBar = inject(SnackBarService);
  router = inject(Router);

  taskId!: number;

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id'])
      this.taskId = Number(params['id']);
      console.log(this.taskId)
      if (this.taskId) {
        const task = this.taskService.getTask(this.taskId);
        console.log(task)
        if (task) {
          this.taskForm.patchValue(task);
        }
      }
    });
  }

  onSubmit(): void {
    console.log(this.taskForm.value);
    if (this.taskForm.invalid) {
      this.snackBar.warning('Please fill the required fields', 'Close');
      return;
    }

    const task = {
      id: this.taskId ? this.taskId : this.taskService.generateRandomId(),
      title: this.taskForm.value.title || '',
      description: this.taskForm.value.description || '',
      completed: false,
      cretatedAt: new Date(),
      updatedAt: new Date(),
    };

    if (this.taskId){
      this.updateTask(task);
    } else {
      this.addTask(task);
    }
  }


  addTask(task: Task): void {
    this.taskService.addTask(task);
    this.taskForm.reset();
    this.snackBar.success('Task added successfully', 'Close');
    this.router.navigate(['/']);
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task);
    this.snackBar.success('Task updated successfully', 'Close');
    this.router.navigate(['/']);
  }


}
