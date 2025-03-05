import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Task[], showCompleted: boolean): Task[] {
    if (showCompleted) return tasks;
    return tasks.filter(task => !task.isCompleted);
  }
} 