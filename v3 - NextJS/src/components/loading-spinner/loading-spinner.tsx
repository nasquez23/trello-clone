import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = ({ marginY }: { marginY: string }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: marginY }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
