import { TaskListProps } from "@/lib/types";
import { Box, Typography } from "@mui/material";

const TaskList = ({ title }: TaskListProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "whitesmoke",
        borderRadius: "10px",
        padding: "1rem",
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}>
        {title}
      </Typography>
    </Box>
  );
};

export default TaskList;
