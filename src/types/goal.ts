export interface Goal {
  id?: string | null;
  name: string;
  description: string;
  priority: number;
  startDate: string;
  endDate: string;
  realizationDate?: string | null;
}
