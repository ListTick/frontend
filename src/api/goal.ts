import { api } from '@/config/axios.ts';
import { Goal } from '@/types/goal';

enum GoalApi {
  GOAL = 'goal'
}

export const createGoal = async (goal: Goal): Promise<Goal> => {
  try {
    const response = await api.post(GoalApi.GOAL, goal);
    return response.data;
  } catch (error) {
    console.error('Error creating goal: ', error);
    throw error;
  }
};

export const getGoals = async (): Promise<Goal[]> => {
  try {
    const response = await api.get(GoalApi.GOAL);
    return response.data;
  } catch (error) {
    console.error('Error fetching goals: ', error);
    throw error;
  }
};

export const updateGoal = async (goal: Goal, goalId: string): Promise<Goal> => {
  try {
    const response = await api.put(`${GoalApi.GOAL}/${goalId}`, goal);
    return response.data;
  } catch (error) {
    console.error('Error updating goal: ', error);
    throw error;
  }
};

export const deleteGoal = async (goalId: string): Promise<void> => {
  try {
    await api.delete(`${GoalApi.GOAL}/${goalId}`);
  } catch (error) {
    console.error('Error deleting goal: ', error);
    throw error;
  }
};
