import { DeleteModalProps } from "@/lib/types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

const DeleteModal = ({
  open,
  onClose,
  handleDeleteTask,
  isDeleting,
}: DeleteModalProps) => {
  return (
    <Dialog
      sx={{ borderRadius: "10px", marginBottom: "20%" }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#6e7dff",
          color: "whitesmoke",
          fontWeight: 600,
          fontSize: "1.4rem",
        }}
      >
        Delete Task
      </DialogTitle>
      <DialogContent sx={{ marginTop: "1.5rem", fontSize: "1.2rem" }}>
        Are you sure you want to delete this task?
      </DialogContent>
      <DialogActions sx={{ padding: "1rem" }}>
        {isDeleting ? (
          <LoadingSpinner />
        ) : (
          <Box>
            <Button
              sx={{
                color: "black",
                marginRight: "0.5rem",
                padding: "0.6rem",
                "&:hover": {
                  backgroundColor: "lightgray",
                },
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteTask}
              sx={{
                padding: "0.6rem",
                color: "white",
                backgroundColor: "#6e7dff",
                "&:hover": {
                  backgroundColor: "#5a67e6",
                },
              }}
            >
              Delete
            </Button>
          </Box>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
