import { ColumnType } from "@/utils/enums";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Column = dynamic(() => import("@/components/Column"), { ssr: false });

export default function Home() {
  return (
    <div>
      {" "}
      <Box>
        <Text variant={"h1"} fontSize={34} fontWeight={600} color={"#3A3A3A"}>
          ✔️ Task List
        </Text>
        <Text
          lineHeight={1.5}
          mt={2}
          mb={8}
          fontWeight={500}
          fontSize={16}
          color={"#3A3A3A"}
        >
          Break your life to simple tasks to get things done!
          <br />
          Does not matter how many tasks you done, It’s important to break to
          small tasks and be on progress.
        </Text>
      </Box>
      <DndProvider backend={HTML5Backend}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 16, md: 3 }}>
          <Column column={ColumnType.TASK} />
          <Column column={ColumnType.DOING} />
          <Column column={ColumnType.DONE} />
        </SimpleGrid>
      </DndProvider>
    </div>
  );
}
