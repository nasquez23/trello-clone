import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import Task from "./task";
import { useState } from "react";
import AddTaskInput from "./add-task-input";
import { Droppable } from "react-beautiful-dnd";
import { Task as TaskType } from "@/types/task";

interface Props {
  title: string;
  tasks: TaskType[] | undefined;
}

const TaskList = ({ title, tasks }: Props) => {
  const [showAddTaskInput, setShowAddTaskInput] = useState<boolean>(false);
  const sectionId = title.replace(" ", "").toLowerCase();

  const hideAddTaskInput = (): void => {
    setShowAddTaskInput(false);
  };

  return (
    <Droppable droppableId={title} direction="vertical">
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            width: "100%",
            maxWidth: "460px",
            height: "100%",
            backgroundColor: "whitesmoke",
            borderRadius: "10px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            position: "relative",
            paddingBottom: showAddTaskInput ? "8rem" : "4rem",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}>
            {title}
          </Typography>

          <Box
            sx={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              flexGrow: 1,
            }}
            component="ul"
          >
            {tasks?.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
          </Box>

          {!showAddTaskInput ? (
            <Box sx={{ position: "absolute", bottom: "1rem", width: "100%" }}>
              <Button
                sx={{
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
            </Box>
          ) : (
            <Box sx={{ position: "absolute", bottom: "1rem", width: "93%" }}>
              <AddTaskInput
                sectionId={sectionId}
                hideAddTaskInput={hideAddTaskInput}
              />
            </Box>
          )}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default TaskList;
