import { Tag } from './tag';

export interface Task {
  id?: string;
  name: string;
  dueDate?: string;
  totalPomodoros?: number;
  completedPomodoros?: number;
  pomodoroDuration?: number;
  breakDuration?: number;
  isCompleted: boolean;
  isDeleted: boolean;
  tag: Tag;
}

export interface PagedTask {
  tasks: Task[];
  totalPages: number;
  totalElements: number;
}
