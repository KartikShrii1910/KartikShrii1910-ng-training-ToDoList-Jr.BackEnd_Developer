import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModal} from '../modal/task.modal';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<TaskModal[]> {
    return this.http.get<TaskModal[]>(`${this.baseUrl}/api/tasks`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<TaskModal>(`${this.baseUrl}/api/task`, task);
  }

  updateTask(taskId: number, task: TaskModal): Observable<TaskModal> {
    return this.http.put<any>(`${this.baseUrl}/api/task/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<TaskModal> {
    return this.http.delete<any>(`${this.baseUrl}/api/task/${taskId}`);
  }
}
