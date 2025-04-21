import { api } from '../config/axios.ts';
import { Task } from '../types/task.ts';

enum TaskEndpoint {
  TASKS = '/tasks'
}

export const getTasks = async () => {
  try {
    const response = await api.get(TaskEndpoint.TASKS);
    return response.data;
  } catch (error) {
    console.error('[API] Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: Task) => {
  try {
    const response = await api.post(TaskEndpoint.TASKS, task);
    return response.data;
  } catch (error) {
    console.error('[API] Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId: string, task: any) => {
  try {
    const response = await api.put(`${TaskEndpoint.TASKS}/${taskId}`, task);
    return response.data;
  } catch (error) {
    console.error('[API] Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await api.delete(`${TaskEndpoint.TASKS}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('[API] Error deleting task:', error);
    throw error;
  }
};
