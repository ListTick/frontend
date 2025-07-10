import { api } from '@/config/axios.ts';
import { ExpenseRequest, ExpenseRequestUpdate, ExpenseResponse } from '@/types/expense';

enum ExpenseAPI {
  EXPENSES = '/expenses'
}

export const getExpenseById = async (id: string): Promise<ExpenseResponse> => {
  try {
    const response = await api.get(`${ExpenseAPI.EXPENSES}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expense by ID: ', error);
    throw error;
  }
}

export const getAllByAccountId = async (): Promise<ExpenseResponse[]> => {
  try {
    const response = await api.get(ExpenseAPI.EXPENSES);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses: ', error);
    throw error;
  }
}

export const createExpense = async (expense: ExpenseRequest): Promise<ExpenseResponse> => {
  try {
    const response = await api.post(ExpenseAPI.EXPENSES, expense);
    return response.data;
  } catch (error) {
    console.error('Error creating expense: ', error);
    throw error;
  }
}

export const updateExpense = async (id: string, expense: ExpenseRequestUpdate): Promise<ExpenseResponse> => {
  try {
    const response = await api.put(`${ExpenseAPI.EXPENSES}/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense: ', error);
    throw error;
  }
}

export const updateExpenseByFields = async (id: string, expense: ExpenseRequestUpdate): Promise<ExpenseResponse> => {
  try {
    const response = await api.patch(`${ExpenseAPI.EXPENSES}/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense by fields: ', error);
    throw error;
  }
}

export const reimburseExpense = async (id: string): Promise<void> => {
  try {
    await api.patch(`${ExpenseAPI.EXPENSES}/${id}/reimburse`);
  } catch (error) {
    console.error('Error deleting expense: ', error);
    throw error;
  }
}