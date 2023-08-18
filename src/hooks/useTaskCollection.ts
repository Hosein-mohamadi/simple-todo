import { useLocalStorage } from 'usehooks-ts';

import { v4 as uuidv4 } from 'uuid';
import { ColumnType, DoingColor, DoneColor, TaskColor } from '../utils/enums';
import { TaskModel } from '../utils/models';

function useTaskCollection() {
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>('tasks', {
    Task: [
      {
        id: uuidv4(),
        column: ColumnType.TASK,
        title: 'Start with meditation, exercise & breakfast for a productive day',
        color: TaskColor,
        isComplete: false
      },
      {
        id: uuidv4(),
        column: ColumnType.TASK,
        title: 'Read to learn something new every day',
        color: TaskColor,
        isComplete: false
      },
      {
        id: uuidv4(),
        column: ColumnType.TASK,
        title: 'Learn something fresh & relevant',
        color: TaskColor,
        isComplete: false
      },
    ],
    Doing: [
      {
        id: uuidv4(),
        column: ColumnType.DOING,
        title: 'Engage & question in meetings',
        color: DoingColor,
        isComplete: false
      },
      {
        id: uuidv4(),
        column: ColumnType.DOING,
        title: 'Use time-blocking for effective days',
        color: DoingColor,
        isComplete: false
      },
    ],
    Done: [
      {
        id: uuidv4(),
        column: ColumnType.DONE,
        title: 'Finished online course - check!',
        color: DoneColor,
        isComplete: true
      },
      {
        id: uuidv4(),
        column: ColumnType.DONE,
        title: 'Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating',
        color: DoneColor,
        isComplete: true
      },
    ],
  });
}

export default useTaskCollection;
