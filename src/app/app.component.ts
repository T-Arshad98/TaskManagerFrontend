import { Component } from '@angular/core';
import { Task } from './shared/models/task';
import { TaskService } from './core/services/task/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterTasksPipe } from './shared/pipes/filter-tasks.pipe';
import { LoginComponent } from './shared/components/login.component';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, FilterTasksPipe],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'TaskManagerFrontend';
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', isCompleted: false, userId: '' };
  constructor(private taskService: TaskService) { 
  }

  editingTask: Task | null = null;  // Add this line
  showCompleted: boolean = true;



  cancelEdit() {
    this.editingTask = null;
  }


  getTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
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
