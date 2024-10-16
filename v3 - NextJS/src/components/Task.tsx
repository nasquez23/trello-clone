"use client";

import { deleteTask, updateTaskTitle } from "@/lib/tasks";
import { TaskProps } from "@/lib/types";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, InputBase, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import DeleteModal from "./DeleteModal";

const Task = ({ task }: TaskProps) => {
  const [showActionBtns, setShowActionBtns] = useState<boolean>(false);
  const [showEditTaskInput, setShowEditTaskInput] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: updateTaskMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateTaskTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      setShowEditTaskInput(false);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const { mutate: deleteTaskMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleUpdateTask = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as { "task-title": string };
    const taskTitle = data["task-title"];
    const taskId = task.id;

    updateTaskMutation({ taskTitle, taskId });
  };

  const handleDeleteTask = () => {
    const taskId = task.id;
    deleteTaskMutation({ taskId });
  };

  return (
    <>
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        handleDeleteTask={handleDeleteTask}
        isDeleting={isDeleting}
      />
      <Box
        onMouseEnter={() => setShowActionBtns(true)}
        onMouseLeave={() => setShowActionBtns(false)}
        sx={{
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          padding: showEditTaskInput ? "0.3rem" : "0.5rem",
          borderRadius: "5px",
          border: showActionBtns ? "2px solid #0047ab" : "1px solid black",
          transition: "box-shadow 0.3s ease",
        }}
        component="li"
      >
        {showEditTaskInput ? (
          <Box
            component="form"
            onSubmit={handleUpdateTask}
            sx={{ width: "80%" }}
          >
            <InputBase
              name="task-title"
              defaultValue={task.title}
              multiline={true}
              rows={2}
              fullWidth={true}
              sx={{
                backgroundColor: "white",
                border: "1px solid black",
                paddingX: "0.5rem",
                borderRadius: "5px",
                "& .MuiInputBase-underline": {
                  display: "none",
                },
              }}
              placeholder="Enter a title"
            />
            {isUpdating ? (
              <LoadingSpinner />
            ) : (
              <Box sx={{ marginTop: "0.5rem" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: "0.4rem 0.7rem",
                    minWidth: "auto",
                    backgroundColor: "#1f51ff",
                    "&:hover": {
                      backgroundColor: "#0047ab",
                    },
                  }}
                >
                  Save Task
                </Button>
                <Button
                  onClick={() => setShowEditTaskInput(false)}
                  type="button"
                  sx={{
                    marginLeft: "0.5rem",
                    textTransform: "none",
                    padding: "0.4rem",
                    color: "black",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <>
            <Typography
              component="span"
              sx={{ fontWeight: 500, whiteSpace: "normal" }}
            >
              {task.title}
            </Typography>
            {showActionBtns && (
              <Box>
                <Button
                  onClick={() => setShowEditTaskInput(true)}
                  sx={{
                    color: "gray",
                    padding: "4px",
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: "lightgray",
                      padding: "4px",
                    },
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  onClick={() => setShowDeleteModal(true)}
                  sx={{
                    color: "gray",
                    padding: "4px",
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: "lightgray",
                      padding: "4px",
                    },
                  }}
                >
                  <Delete />
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Task;
