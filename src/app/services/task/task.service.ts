import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = environment.taskKey;

  private originalTasks: Task[] = [];

  private taskSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.loadTasksFromLocalStorage());
  tasks$ = this.taskSubject.asObservable();


  private loadTasksFromLocalStorage(): Task[] {
    const tasksJson = localStorage.getItem(this.localStorageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  private saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  addTask(task: Task): void {
    const currentTasks = this.taskSubject.getValue();
    const updatedTasks = [...currentTasks, task];
    this.taskSubject.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
  }

  removeTask(taskId: number): void {
    const currentTasks = this.taskSubject.getValue();
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.taskSubject.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
  }

  updateTask(updatedTask: Task): void {
    const currentTasks = this.taskSubject.getValue();
    const taskIndex = currentTasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      currentTasks[taskIndex] = updatedTask;
      this.taskSubject.next([...currentTasks]);
      this.saveTasksToLocalStorage(currentTasks);
    }
  }

  getTask(taskId: number): Task | undefined {
    const currentTasks = this.taskSubject.getValue();
    return currentTasks.find(task => task.id === taskId);
  }

  generateRandomId(): number {
    return Math.floor(Math.random() * 100000);
  }

filterAndSearchTasks(filterBy: string, searchTerm: string): void {
  if (!this.originalTasks.length) {
    this.originalTasks = this.taskSubject.getValue();
  }

  let updatedTasks = this.originalTasks;

  if (filterBy) {
    updatedTasks = updatedTasks.filter(task => {
      if (filterBy === 'completed') {
        return task.completed;
      }
      return true;
    });
  }

  if (searchTerm) {
    updatedTasks = updatedTasks.filter(task => {
      return task.title?.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  this.taskSubject.next(updatedTasks);

  if (!filterBy && !searchTerm) {
    this.originalTasks = [];
  }
}
}
