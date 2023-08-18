import theme from "@/config/theme";
import { ColumnType } from "@/utils/enums";
import {
  ChakraProvider,
  Container,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Column = dynamic(() => import("@/components/Column"), { ssr: false });
function App() {
  return (
    <main>
      <ChakraProvider theme={theme}>
        <Heading
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
          fontWeight="bold"
          textAlign="center"
          // bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          mt={4}
        >
          Welcome to DnD Kanban
        </Heading>
        <DndProvider backend={HTML5Backend}>
          <Container maxWidth="container.lg" px={4} py={10}>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 16, md: 3 }}
            >
              <Column column={ColumnType.TASK} />
              <Column column={ColumnType.DOING} />
              <Column column={ColumnType.DONE} />
            </SimpleGrid>
          </Container>
        </DndProvider>
      </ChakraProvider>
    </main>
  );
}

export default App;
