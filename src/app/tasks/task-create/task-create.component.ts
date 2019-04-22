import { Component, Output, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import { TasksService } from '../tasks.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Task } from "../task.model";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  content = '';
  task: Task;
  isLoading = false;
  private mode = 'create';
  private taskId: string;

  constructor(public tasksService: TasksService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.isLoading = true;
        this.tasksService.getTask(this.taskId).subscribe(taskData => {
          this.isLoading = false;
          this.task = { id: taskData._id, content: taskData.content }
        });
      } else {
        this.mode = 'create';
        this.taskId = null;
      }
    });
  }

  /**
  * On submit form, call addtask from service to process HTTP request
  */
  onSaveTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.tasksService.addTask(form.value.content)
    } else {
      this.tasksService.updateTask(this.taskId, form.value.content);
    }
    this.isLoading = false;
    form.resetForm();
  }
}
