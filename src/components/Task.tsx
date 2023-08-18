import { CloseIcon } from "@chakra-ui/icons";
import { Box, Checkbox, IconButton, ScaleFade } from "@chakra-ui/react";
import _ from "lodash";
import { memo } from "react";
import { useTaskDragAndDrop } from "../hooks/useTaskDragAndDrop";
import { TaskModel } from "../utils/models";
import { AutoResizeTextarea } from "./AutoResizeTextArea";
import { ColumnType } from "../utils/enums";

type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel["id"], updatedTask: TaskModel) => void;
  onDelete: (id: TaskModel["id"]) => void;
  onDropHover: (i: number, j: number) => void;
  onComplete: (i: ColumnType, id: TaskModel["id"], isComplete: boolean) => void;
  column: ColumnType;
};

function Task({
  index,
  task,
  onUpdate: handleUpdate,
  onDropHover: handleDropHover,
  onDelete: handleDelete,
  onComplete: handleComplete,
  column,
}: TaskProps) {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>(
    { task, index: index },
    handleDropHover
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    handleUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  const handleCompleteTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleComplete(column, task?.id, event.target.checked);
  };

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        w={"auto"}
        pl={3}
        pr={7}
        py={2}
        boxShadow="xl"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        bgColor={"white"}
        border={`1px solid ${task?.color.colorBtn}`}
        opacity={isDragging ? 0.5 : 1}
      >
        <Checkbox
          defaultChecked={task?.isComplete}
          checked={task?.isComplete}
          onChange={handleCompleteTask}
        />
        <IconButton
          position="absolute"
          right={1}
          zIndex={100}
          aria-label="delete-task"
          size="xs"
          colorScheme="solid"
          icon={<CloseIcon sx={{ color: task?.color.colorText }} />}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={handleDeleteClick}
        />
        <AutoResizeTextarea
          value={task?.title}
          fontWeight="semibold"
          cursor="inherit"
          border="none"
          p={0}
          resize="none"
          sx={{ boxShadow: "none !important" }}
          focusBorderColor="none"
          onChange={handleTitleChange}
          style={{ textDecorationLine: task?.isComplete ? "line-through" : "" }}
        />
      </Box>
    </ScaleFade>
  );
}
export default memo(Task, (prev, next) => {
  if (
    _.isEqual(prev.task, next.task) &&
    _.isEqual(prev.index, next.index) &&
    _.isEqual(prev.column, next.column) &&
    prev.onDelete === next.onDelete &&
    prev.onDropHover === next.onDropHover &&
    prev.onUpdate === next.onUpdate &&
    prev.onComplete === next.onComplete
  ) {
    return true;
  }
  return false;
});
