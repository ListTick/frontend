import { api } from '../config/axios.ts';

enum TaskEndpoint {
  GET_TASKS = '/tasks',
  CREATE_TASK = '/tasks',
  UPDATE_TASK = '/tasks',
  DELETE_TASK = '/tasks'
}

export const getTasks = async () => {
  try {
    const response = await api.get(TaskEndpoint.GET_TASKS);
    return response.data;
  } catch (error) {
    console.error('[API] Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: any) => {
  try {
    const response = await api.post(TaskEndpoint.CREATE_TASK, task);
    return response.data;
  } catch (error) {
    console.error('[API] Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId: string, task: any) => {
  try {
    const response = await api.put(`${TaskEndpoint.UPDATE_TASK}/${taskId}`, task);
    return response.data;
  } catch (error) {
    console.error('[API] Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await api.delete(`${TaskEndpoint.DELETE_TASK}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('[API] Error deleting task:', error);
    throw error;
  }
};
