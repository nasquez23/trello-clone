"use client";

import { Box, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TaskList from "./task-list";
import { fetchTasks, moveTaskBetweenSections } from "@/api/tasks";
import LoadingSpinner from "@/components/loading-spinner/loading-spinner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { Task } from "@/types/task";

const Board = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return <LoadingSpinner marginY="10%" />;
  }

  const onDragEnd = (result: any) => {
    const { destination, draggableId, source } = result;
    const sectionId = destination.droppableId.replace(" ", "").toLowerCase();

    if (!destination || destination.droppableId === source.droppableId) return;

    moveTaskBetweenSections(draggableId, sectionId);
    toast.success(`Task moved to ${destination.droppableId} section`);
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          marginTop: "1rem",
          width: "100%",
          color: "white",
          padding: "1rem",
          backgroundColor: "#5a6bdf",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>{`${
          auth.currentUser?.displayName
            ? `${auth.currentUser.displayName}'s Board `
            : "Project Board"
        }`}</Typography>
      </Box>
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
    </DragDropContext>
  );
};

export default Board;
