export interface ItemResponse {
  id?: string;
  name: string;
}

export interface ItemRequest {
  name: string;
  bucketListId: string;
}

export interface ItemRequestUpdate {
  name?: string;
  active?: boolean;
}