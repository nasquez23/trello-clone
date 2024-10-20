import { signInWithGoogle } from "@/api/auth";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const GoogleSignInButton = () => {
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Succesfully logged in with Google.");
      router.push("/");
    } catch (error) {
      toast.error("Google Sign In failed. Please try again.");
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="contained"
      sx={{
        marginTop: "1rem",
        transition: "background-color .3s, box-shadow .3s",
        padding: "12px 16px 12px 42px",
        border: "none",
        borderRadius: "3px",
        boxShadow: "0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",
        color: "gray",
        fontSize: "14px",
        textAlign: "center",
        fontWeight: 600,
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif",
        backgroundColor: "white",
        backgroundImage:
          "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "5.8rem 15px",
        "&:hover": {
          boxShadow:
            "0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25)",
        },
        "&:active": {
          backgroundColor: "#eeeeee",
        },
        "&:focus": {
          outline: "none",
          boxShadow:
            "0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25), 0 0 0 3px #c8dafc",
        },
        "&:disabled": {
          filter: "grayscale(100%)",
          backgroundColor: "#ebebeb",
          boxShadow:
            "0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",
          cursor: "not-allowed",
        },
      }}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
