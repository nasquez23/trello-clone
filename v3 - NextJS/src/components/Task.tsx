import { TaskProps } from "@/lib/types";
import { Box } from "@mui/material";

const Task = ({ task }: TaskProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid black",
        fontWeight: 500,
      }}
      component="li"
    >
      {task.title}
    </Box>
  );
};

export default Task;
