import { useLocalStorage } from 'usehooks-ts';

import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';

function useTaskCollection() {
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>('tasks', {
    Task: [
      {
        id: uuidv4(),
        column: ColumnType.TASK,
        title: 'Task',
        color: { bg: '#FEF4F3', colorTitle: '#6E1E29', colorText: '#D4AFB4', colorBtn: '#D37A86' },
        isComplete: false
      },
    ],
    Doing: [
      {
        id: uuidv4(),
        column: ColumnType.DOING,
        title: 'Doing',
        color: { bg: '#FFFBF2', colorTitle: '#795B19', colorText: '#DECBA3', colorBtn: '#C2A25A' },
        isComplete: false
      },
    ],
    Done: [
      {
        id: uuidv4(),
        column: ColumnType.DONE,
        title: 'Done',
        color: { bg: '#F4F9F3', colorTitle: '#286C1A', colorText: '#BBD6B6', colorBtn: '#286C1A' },
        isComplete: true
      },
    ],
  });
}

export default useTaskCollection;
