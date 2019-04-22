import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router"

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from './task.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/tasks/";

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getTasks() {
    this.http
      .get<{ message: string, tasks: any }>(
        BACKEND_URL
      )
      .pipe(
        map((taskData) => {
          return taskData.tasks.map(task => {
            return {
              content: task.content,
              id: task._id,
              creator: task.creator
            }
          });
        }))
      .subscribe((transformedtasks) => {
        console.log(transformedtasks);
        this.tasks = transformedtasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getTask(id: string) {
    return this.http.get<{ _id: string, content: string }>(BACKEND_URL + id);
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  addTask(content: string) {
    const task: Task = { id: null, content: content };
    this.http
      .post<{ message: string, taskId: string }>(
        BACKEND_URL,
        task
      )
      .subscribe((responseData) => {
        const taskId = responseData.taskId;
        task.id = taskId;
        this.tasks.push(task);
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  updateTask(id: string, content: string) {
    const task: Task = { id: id, content: content };
    console.log(BACKEND_URL + id)
    this.http.put(BACKEND_URL + id, task)
      .subscribe(response => {
        const updatedtasks = [...this.tasks];
        const oldtaskIndex = updatedtasks.findIndex(p => p.id === task.id);
        updatedtasks[oldtaskIndex] = task;
        this.tasks = updatedtasks;
        this.tasksUpdated.next([...this.tasks]);
        this.router.navigate(["/"]);
      });
  }

  deleteTask(taskId: string) {
    this.http.delete(BACKEND_URL + taskId)
      .subscribe(() => {
        const updatedtasks = this.tasks.filter(task => task.id !== taskId);
        this.tasks = updatedtasks;
        this.tasksUpdated.next([...this.tasks]);
      })
  }
}
