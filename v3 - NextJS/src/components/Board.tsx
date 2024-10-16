"use client";

import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import TaskList from "./TaskList";
import { fetchTasks } from "@/lib/tasks";
import { Task } from "@/lib/types";
import LoadingSpinner from "./LoadingSpinner";

const Board = () => {
  const { data: tasks, isLoading } = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) {
    return <LoadingSpinner />
  }

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
      <TaskList
        title="To Do"
        tasks={tasks?.filter((task) => task.sectionId === "todo")}
      />
      <TaskList
        title="In Progress"
        tasks={tasks?.filter((task) => task.sectionId === "inprogress")}
      />
      <TaskList
        title="Done"
        tasks={tasks?.filter((task) => task.sectionId === "done")}
      />
    </Box>
  );
};

export default Board;
