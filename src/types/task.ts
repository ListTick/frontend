import { Tag } from '@/types/tag.ts';

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

export interface TaskWithTagId {
  id?: string;
  name: string;
  totalPomodoros?: number;
  completedPomodoros?: number;
  pomodoroDuration?: number;
  breakDuration?: number;
  dueDate?: string;
  isCompleted: boolean;
  tagId?: string; // Only the tag ID is stored here, not the full Tag object
}

export interface PagedTask {
  tasks: Task[];
  totalPages: number;
  totalElements: number;
}
