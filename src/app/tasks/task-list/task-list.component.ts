import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = []
  isLoading = false;
  private tasksSub: Subscription;
  private authStatusSub: Subscription;
  private userIsAuthenticated = false;

  constructor(public tasksService: TasksService, private authService: AuthService) {}

  ngOnInit() {
    this.tasksService.getTasks();
    this.isLoading = true;
    this.tasksSub = this.tasksService.getTaskUpdateListener()
    .subscribe((tasks: Task[])=>{
      this.isLoading = false;
      this.tasks = tasks;
    });
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onDelete(taskId: string){
    this.tasksService.deleteTask(taskId);
  }

  ngOnDestroy(){
    this.tasksSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
