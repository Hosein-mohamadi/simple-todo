import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { ColumnColorScheme, swap } from '../utils/helpers';
import { debug } from '../utils/logging';
import { TaskModel } from '../utils/models';
import useTaskCollection from './useTaskCollection';

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column: ColumnType) {
  const [tasks, setTasks] = useTaskCollection();

  const columnTasks = tasks[column];

  const addEmptyTask = useCallback(() => {
    debug(`Adding new empty task to ${column} column`);
    setTasks((allTasks) => {
      const columnTasks = allTasks[column];

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        debug('Too many task!');
        return allTasks;
      }

      const newColumnTask: TaskModel = {
        id: uuidv4(),
        title: '',
        color: ColumnColorScheme[column],
        column,
        isComplete: false
      };

      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks],
      };
    });
  }, [column, setTasks]);

  const addNewTask = useCallback((text: string, column: ColumnType) => {
    debug(`Adding new empty task to ${column} column`);
    setTasks((allTasks) => {
      const columnTasks = allTasks[column];

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        debug('Too many task!');
        return allTasks;
      }

      const newColumnTask: TaskModel = {
        id: uuidv4(),
        title: text,
        color: ColumnColorScheme[column],
        column,
        isComplete: column === 'Done' ? true : false
      };


      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks],
      };
    });
  }, [column, setTasks]);

  const deleteTask = useCallback(
    (id: TaskModel['id']) => {
      debug(`Removing task ${id}..`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task.id !== id),
        };
      });
    },
    [column, setTasks],
  );

  const updateTask = useCallback(
    (id: TaskModel['id'], updatedTask: Omit<Partial<TaskModel>, 'id'>) => {
      console.log(id, updateTask)
      debug(`Updating task ${id} with ${JSON.stringify(updateTask)}`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task,
          ),
        };
      });
    },
    [column, setTasks],
  );

  const dropTaskFrom = useCallback(
    (from: ColumnType, id: TaskModel['id']) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[column];
        const movingTask = fromColumnTasks.find((task) => task.id === id);


        if (!movingTask) {
          return allTasks;
        }
        console.log({ ...movingTask, column, ...(column === 'Done' ? { isComplete: true } : { isComplete: false }), color: ColumnColorScheme[column] })
        // remove the task from the original column and copy it within the destination column
        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [{ ...movingTask, column, ...(column === 'Done' ? { isComplete: true } : { isComplete: false }), color: ColumnColorScheme[column] }, ...toColumnTasks],
        };
      });
    },
    [column, setTasks],
  );

  const isCompleteTask = useCallback(
    (from: ColumnType, id: TaskModel['id'], isComplete: boolean) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[isComplete ? 'Done' : 'Task'];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        if (!movingTask) {
          return allTasks;
        }

        // Remove the task from the original column and copy it to the destination column
        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [isComplete ? 'Done' : 'Task']: [{ ...movingTask, column: isComplete ? 'Done' : 'Task', isComplete, color: ColumnColorScheme[column] }, ...toColumnTasks],
        };
      });
    },
    [column, setTasks],
  );


  const swapTasks = useCallback(
    (i: number, j: number) => {
      debug(`Swapping task ${i} with ${j} in ${column} column`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: swap(columnTasks, i, j),
        };
      });
    },
    [column, setTasks],
  );

  return {
    tasks: columnTasks,
    addEmptyTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
    isCompleteTask,
    addNewTask
  };
}

export default useColumnTasks;
