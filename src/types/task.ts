import { Tag } from './tag';

export interface Task {
  id?: string;
  name: string;
  totalPomodoros?: number;
  completedPomodoros?: number;
  pomodoroDuration?: number;
  breakDuration?: number;
  dueDate?: string;
  isCompleted: boolean;
  tag: Tag | undefined;
}

export interface PagedTask {
  tasks: Task[];
  totalPages: number;
  totalElements: number;
}
