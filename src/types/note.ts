export interface NoteResponse {
  id: string;
  title: string;
  createdAt: Date;
  modifiedAt: Date;
  description: string;
  creationDate: Date;
  accountId: string;
}

export interface NoteRequest {
  title?: string;
  description?: string;
}