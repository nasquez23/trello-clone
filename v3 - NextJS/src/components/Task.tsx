import { Box } from "@mui/material";

const Task = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid black",
        fontWeight: "bold"
      }}
      component="li"
    >
      task 1
    </Box>
  );
};

export default Task;
