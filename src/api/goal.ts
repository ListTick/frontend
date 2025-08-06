import { api } from '@/config/axios.ts';
import { Goal } from '@/types/goal.ts';

enum GoalApi {
  GOAL = 'goal'
}

export const getGoalsByUserId = async (): Promise<Goal[]> => {
  try {
    const response = await api.get(GoalApi.GOAL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

export const createGoal = async (goal: Goal): Promise<Goal> => {
  try {
    const response = await api.post(GoalApi.GOAL, goal);
    return response.data;
  } catch (error) {
    console.error('Error creating goal: ', error);
    throw error;
  }
};

export const updateGoal = async (goal: Goal, goalId: string): Promise<Goal> => {
  try {
    const response = await api.put(`${GoalApi.GOAL}/${goalId}`, goal);
    return response.data;
  } catch (error) {
    console.error('Error updating tag: ', error);
    throw error;
  }
};

export const deleteGoal = async (goalId: string): Promise<void> => {
  try {
    const response = await api.delete(`${GoalApi.GOAL}/${goalId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting goal: ', error);
    throw error;
  }
};
