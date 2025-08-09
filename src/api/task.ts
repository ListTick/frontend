import { api } from '@/config/axios';
import { PagedTask, Task, TaskWithTagId } from '@/types/task';

enum TaskApi {
  TASK = 'task'
}

export const getTasksByUserId = async (tagId: string | null): Promise<Task[]> => {
  try {
    if (tagId !== null) {
      const response = await api.get(`${TaskApi.TASK}?tagId=${tagId}`);
      return Array.isArray(response.data) ? response.data : [];
    }
    const response = await api.get(`${TaskApi.TASK}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

export const getArchivedTasksByUserId =
    async (page: number, size: number, tagId: string | null): Promise<PagedTask> => {

  try {
    let response;
    if (tagId !== null) {
      response = await api
        .get(`${TaskApi.TASK}/archive?tagId=${tagId}&page=${page}&size=${size}&sort=name%2CASC`);
    } else {
      response = await api
        .get(`${TaskApi.TASK}/archive?page=${page}&size=${size}&sort=name%2CASC`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};
export const createTask = async (task: TaskWithTagId): Promise<Task> => {
  try {
    const response = await api.post(TaskApi.TASK, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task: ', error);
    throw error;
  }
};

export const updateTask = async (task: TaskWithTagId, taskId: string): Promise<Task> => {
  try {
    const response = await api.put(`${TaskApi.TASK}/${taskId}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task: ', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await api.delete(`${TaskApi.TASK}/${taskId}`);
  } catch (error) {
    console.error('Error deleting task: ', error);
    throw error;
  }
};

export const toggleTaskComplete = async (taskId: string): Promise<void> => {
  try {
    await api.patch(`${TaskApi.TASK}/${taskId}/complete`);
  } catch (error) {
    console.error('Error toggling task completion: ', error);
    throw error;
  }
};

export const deleteAllCompletedTasks = async (): Promise<void> => {
  try {
    await api.post(`${TaskApi.TASK}/deleteCompleted`);
  } catch (error) {
    console.error('Error deleting completed tasks: ', error);
    throw error;
  }
};

export const updateCompletedPomodoros = async (taskId: string, completedPomodoros: number): Promise<void> => {
  try {
    await api.patch(`${TaskApi.TASK}/${taskId}?completedPomodoros=${completedPomodoros}`);
  } catch (error) {
    console.error('Error updating completed pomodoros: ', error);
    throw error;
  }
};
