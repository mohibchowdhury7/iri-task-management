import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { Task } from '../../interfaces';
import { TaskService } from '../../services';
import { ActivatedRoute } from '@angular/router';

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
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task);
  }
}
