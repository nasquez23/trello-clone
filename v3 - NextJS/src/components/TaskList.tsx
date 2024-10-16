"use client";

import { TaskListProps } from "@/lib/types";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import Task from "./Task";
import { useState } from "react";
import AddTaskInput from "./AddTaskInput";

const TaskList = ({ title, tasks }: TaskListProps) => {
  const [showAddTaskInput, setShowAddTaskInput] = useState<boolean>(false);

  const hideAddTaskInput = (): void => {
    setShowAddTaskInput(false);
  };

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
      <Box
        sx={{
          margin: "1rem 0 0.5rem 0",
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
        component="ul"
      >
        {tasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Box>
      {!showAddTaskInput ? (
        <Button
          sx={{
            marginTop: "0.5rem",
            width: "70%",
            textAlign: "left",
            color: "black",
            display: "flex",
            justifyContent: "start",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { backgroundColor: "lightgray" },
          }}
          onClick={() => setShowAddTaskInput(true)}
        >
          <Add />
          Add a Card
        </Button>
      ) : (
        <AddTaskInput hideAddTaskInput={hideAddTaskInput} />
      )}
    </Box>
  );
};

export default TaskList;
