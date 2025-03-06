import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';

import { Task } from './shared/models/task';
import { TaskService } from './services/task/task.service';
import { FilterTasksPipe } from './shared/pipes/filter-tasks.pipe';
import { LoginComponent } from './shared/components/login.component';
import { AuthService } from './services/auth/auth.service';

import { Observable } from 'rxjs';
@Component({
    selector: 'app-root',
    imports: [ FormsModule, CommonModule, FilterTasksPipe, LoginComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'TaskManagerFrontend';
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', isCompleted: false, userId: '' };
  user$: Observable<User | null>;

  constructor(private taskService: TaskService, private authService: AuthService) { 
    this.user$ = this.authService.user$;
  }

  editingTask: Task | null = null;  // Add this line
  showCompleted: boolean = true;

  logout() {
    this.authService.logout();
  }

  cancelEdit() {
    this.editingTask = null;
  }
  
  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.newTask.userId = user.uid; // Use uid or displayName as needed
      }
    });
    this.getTasks();
  }

  getTasks() {
    this.user$.subscribe(user => {
      if (user) {
        this.taskService.getTasks(user).subscribe(tasks => this.tasks = tasks);
      }
    });
  }

  addTask() {
    this.taskService.addTask(this.newTask).subscribe(task => {
      this.tasks.push(task);
      this.newTask = { title: '', description: '', isCompleted: false, userId: this.newTask.userId};
    });
  }

  editTask(task: Task) {
    this.editingTask = { ...task };  // Create a copy of the task
  }

  updateTask() {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask).subscribe(() => {
        this.getTasks();
        this.editingTask = null;  // Clear the editing task
      });
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.getTasks());
  }
}
