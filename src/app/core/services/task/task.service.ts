import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../../../shared/models/task';
import { switchMap } from 'rxjs/operators';
import { User } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    private apiUrl = 'https://taskmanagerapi-gcc8.onrender.com/api/tasks'; // Adjust port if different

    constructor(private http: HttpClient) { }

    getTasks(user: User): Observable<any[]> {
        return of(user).pipe(
          switchMap(user => {
            if (user) {
              // Make an API call to get tasks for the logged-in user
              return this.http.get<any[]>(`${this.apiUrl}?userId=${user.uid}`);
            } else {
              return of([]); // Return an empty array if no user is logged in
            }
          })
        );
      }

    addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    updateTask(task: Task): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
    }

    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}