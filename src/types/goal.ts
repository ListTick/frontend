export interface Goal {
  id?: string,
  name: string,
  description?: string,
  priority?: number,
  startDate: Date,
  endDate: Date,
  realizationDate?: Date,
  goal?: Goal
}