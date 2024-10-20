import { Box, Button, InputBase } from "@mui/material";
import { Close } from "@mui/icons-material";
import { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveTask } from "@/api/tasks";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/loading-spinner/loading-spinner";

interface Props {
  sectionId: string;
  hideAddTaskInput: () => void;
}

const AddTaskInput = ({ sectionId, hideAddTaskInput }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: saveTask,
    onSuccess: () => {
      toast.success("Task added.");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      hideAddTaskInput();
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as { "task-title": string };
    const taskTitle = data["task-title"];

    mutate({ sectionId, taskTitle });
  };

  return (
    <Box component="form" onSubmit={handleAddTask}>
      <InputBase
        name="task-title"
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
      {isPending ? (
        <LoadingSpinner marginY="0" />
      ) : (
        <Box sx={{ marginTop: "0.5rem" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              fontWeight: "bold",
              backgroundColor: "#1f51ff",
              "&:hover": {
                backgroundColor: "#0047ab",
              },
            }}
          >
            Save Card
          </Button>
          <Button
            type="button"
            sx={{
              color: "black",
              marginLeft: "0.5rem",
              padding: "0.5rem",
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "lightgray",
              },
            }}
            onClick={hideAddTaskInput}
          >
            <Close />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddTaskInput;
