import { api } from '@/config/axios.ts';
import { NotificationResponse } from '@/types/notification.ts';

enum NotificationApi {
  NOTIFICATIONS = '/notifications'
}

export const getNotificationById = async (id: string): Promise<NotificationResponse> => {
  try {
    const response = await api.get(`${NotificationApi.NOTIFICATIONS}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification by ID: ', error);
    throw error;
  }
}

export const getAllNotificationsByAccountId = async (): Promise<NotificationResponse[]> => {
  try {
    const response = await api.get(NotificationApi.NOTIFICATIONS);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications: ', error);
    throw error;
  }
}

  export const acknowledgeNotification = async (id: string): Promise<NotificationResponse> => {
    try {
      const response = await api.patch(`${NotificationApi.NOTIFICATIONS}/${id}/acknowledge`);
      return response.data;
    } catch (error) {
      console.error('Error acknowleding notification: ', error);
      throw error;
    }
  }

  export const deleteNotification = async (id: string): Promise<void> => {
    try {
      await api.delete(`${NotificationApi.NOTIFICATIONS}/${id}`);
    } catch (error) {
      console.error('Error deleting notification: ', error);
      throw error;
    }
}