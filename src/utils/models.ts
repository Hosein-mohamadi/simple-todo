import { ColumnType } from './enums';
import { TColor } from './interface';

export interface TaskModel {
  id: string;
  title: string;
  column: ColumnType;
  color: TColor;
  isComplete: boolean
}

export interface DragItem {
  index: number;
  id: TaskModel['id'];
  from: ColumnType;
}
