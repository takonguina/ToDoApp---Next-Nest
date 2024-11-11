export class CreateTaskDto {
  shortDescription: string;
  longDescription: string;
  dueDate: Date;
  completed: boolean;
  taskListId: number;
}
