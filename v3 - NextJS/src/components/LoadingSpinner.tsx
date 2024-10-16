import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: "5%" }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
