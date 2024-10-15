import { Box } from "@mui/material";
import TaskList from "./TaskList";

const Board = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: "1rem",
        paddingX: "1rem",
        marginTop: "1rem",
      }}
    >
      <TaskList title="To Do" />
      <TaskList title="In Progress" />
      <TaskList title="Done" />
    </Box>
  );
};

export default Board;
