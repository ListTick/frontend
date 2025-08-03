import { api } from '@/config/axios.ts';
import { NoteRequest, NoteResponse } from '@/types/note.ts';

enum NoteApi {
  NOTES = '/notes'
}

export const getNoteById = async (id: string): Promise<NoteResponse> => {
  try {
    const response = await api.get(`${NoteApi.NOTES}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching note by ID: ', error);
    throw error;
  }
}

export const getAllNotesByAccountId = async (): Promise<NoteResponse[]> => {
  try {
    const response = await api.get(NoteApi.NOTES);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes: ', error);
    throw error;
  }
}

export const createNote = async (note: NoteRequest): Promise<NoteResponse> => {
  try {
    const response = await api.post(NoteApi.NOTES, note);
    return response.data;
  } catch (error) {
    console.error('Error creating note: ', error);
    throw error;
  }
}

export const updateNoteByFields = async (id: string, note: NoteRequest): Promise<NoteResponse> => {
  try {
    const response = await api.patch(`${NoteApi.NOTES}/${id}`, note);
    return response.data;
  } catch (error) {
    console.error('Error updating note by fields: ', error);
    throw error;
  }
}

export const deleteNote = async (id: string): Promise<void> => {
  try {
    await api.delete(`${NoteApi.NOTES}/${id}`);
  } catch (error) {
    console.error('Error deleting note: ', error);
    throw error;
  }
}