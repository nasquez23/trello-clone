"use client";

import { updateUserProfile, verifyUserEmail } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { CancelRounded, CheckCircle } from "@mui/icons-material";
import ProfileAvatar from "./ProfileAvatar";

const ProfileCard = () => {
  const user = auth.currentUser;
  const [editing, setEditing] = useState<boolean>(false);

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Profile updated succesfully!");
      setEditing(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: verifyEmail, isPending: isSendingEmail } = useMutation({
    mutationFn: verifyUserEmail,
    onSuccess: () => {
      toast.success("Verification email sent. Please check your inbox.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as { name: string };

    updateProfile(data.name);
  };

  return (
    <Box sx={{ padding: "2rem", width: "100%" }}>
      <Typography
        variant="h4"
        sx={{
          color: "white",
          textAlign: "center",
          marginRight: "1rem",
          marginBottom: "2rem",
        }}
      >
        My Profile
      </Typography>

      <Paper
        sx={{ padding: "2rem", textAlign: "center", width: "50%", mx: "auto" }}
      >
        <ProfileAvatar />
        <Typography variant="h6">
          {user?.displayName || "Anonymous User"}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "gray", marginBottom: "1rem" }}
        >
          {user?.email}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
          }}
        >
          {user?.emailVerified ? (
            <CheckCircle
              sx={{ marginRight: "0.4rem", color: "green", fontSize: "1.5rem" }}
            />
          ) : (
            <CancelRounded
              sx={{ marginRight: "0.4rem", color: "red", fontSize: "1.5rem" }}
            />
          )}
          Your email is{!user?.emailVerified && "n't"} verified.
        </Typography>
        {!user?.emailVerified && (
          <Box sx={{ marginTop: "1rem" }}>
            {isSendingEmail ? (
              <LoadingSpinner />
            ) : (
              <Button
                onClick={() => verifyEmail()}
                disabled={isSendingEmail}
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  padding: "0.7rem 1.2rem",
                  backgroundColor: "#1f51ff",
                  "&:hover": {
                    backgroundColor: "#0047ab",
                  },
                }}
              >
                Verify Email
              </Button>
            )}
          </Box>
        )}

        {editing && (
          <>
            <Box
              component="form"
              onSubmit={handleSaveChanges}
              sx={{ width: "100%", marginTop: "1rem" }}
            >
              <TextField
                required
                label="Name"
                name="name"
                defaultValue={auth.currentUser?.displayName}
                fullWidth
                sx={{ marginBottom: "1rem" }}
              />
              {isUpdating ? (
                <LoadingSpinner />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isUpdating}
                    sx={{
                      marginRight: "1rem",
                      fontWeight: "bold",
                      backgroundColor: "#1f51ff",
                      "&:hover": {
                        backgroundColor: "#0047ab",
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    sx={{
                      fontWeight: "bold",
                      border: "none",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "lightgray",
                      },
                    }}
                    variant="outlined"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>
          </>
        )}

        {!editing && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                marginTop: "1rem",
                color: "white",
                fontWeight: "bold",
                padding: "0.7rem 1.2rem",
                backgroundColor: "#1f51ff",
                "&:hover": {
                  backgroundColor: "#0047ab",
                },
              }}
              variant="outlined"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProfileCard;
