import React from "react";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signInWithGithub } from "@/lib/auth";

const GithubSignInButton = () => {
  const router = useRouter();

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
      toast.success("Succesfully logged in with Github.");
      router.push("/");
    } catch (error) {
      toast.error("Github Sign In failed. Please try again.");
    }
  };

  return (
    <Button
      onClick={handleGithubSignIn}
      variant="contained"
      sx={{
        marginTop: "1rem",
        padding: "12px 0",
        border: "none",
        borderRadius: "3px",
        boxShadow: "0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",
        color: "#fff",
        fontSize: "14px",
        textAlign: "center",
        fontWeight: 500,
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif",
        backgroundColor: "#333",
        "&:hover": {
          backgroundColor: "#444",
          boxShadow:
            "0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25)",
        },
        "&:active": {
          backgroundColor: "#555",
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
      startIcon={<GitHubIcon sx={{ marginRight: "0" }} />}
    >
      Sign in with GitHub
    </Button>
  );
};

export default GithubSignInButton;
