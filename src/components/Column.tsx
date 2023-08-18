import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import Task from "./Task";
import { ColumnColorScheme } from "../utils/helpers";
import { ColumnType } from "@/utils/enums";
import useColumnTasks from "@/hooks/useColumnTasks";
import useColumnDrop from "@/hooks/useColumnDrop";

function Column({ column }: { column: ColumnType }) {
  const {
    tasks,
    addEmptyTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
    updateTask,
    isCompleteTask,
    addNewTask,
  } = useColumnTasks(column);
  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks?.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDropHover={swapTasks}
      onUpdate={updateTask}
      onDelete={deleteTask}
      onComplete={isCompleteTask}
      column={column}
    />
  ));

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    if (pastedText) {
      addNewTask(pastedText, column);
    }
  };
  
  const colors = ColumnColorScheme[column];
  
  return (
    <div>
      <Stack
        ref={dropRef}
        direction={{ base: "row", md: "column" }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={colors.bg}
        rounded="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
        onPaste={handlePaste}
      >
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text className="text-yellow-800 text-[15px] font-semibold">
              {column}
            </Text>
            <Text color={colors.colorText} className="text-xs font-medium">
              {ColumnTasks?.length} Tasks
            </Text>
          </Box>
          {ColumnTasks}
          {column !== "Done" && (
            <Button
              _hover={{ bg: "transparent" }}
              className="flex !items-center gap-2 text-sm !bg-transparent !justify-start !p-0"
              onClick={addEmptyTask}
              color={colors.colorBtn}
            >
              <AddIcon className="text-xs" sx={{ color: colors.colorBtn }} />
              New
            </Button>
          )}
        </>
      </Stack>
    </div>
  );
}

export default Column;
