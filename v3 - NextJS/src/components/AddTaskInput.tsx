import { AddTaskInputProps } from "@/lib/types";
import { Box, Button, InputBase } from "@mui/material";
import { Close } from "@mui/icons-material";

const AddTaskInput = ({ hideAddTaskInput }: AddTaskInputProps) => {
  return (
    <Box>
      <InputBase
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
      <Box sx={{ marginTop: "0.5rem" }}>
        <Button
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
    </Box>
  );
};

export default AddTaskInput;
