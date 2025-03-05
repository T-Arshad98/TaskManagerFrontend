import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'https://taskmanagerapi-gcc8.onrender.com/api/tasks'; // Adjust port if different

    constructor(private http: HttpClient) { }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
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