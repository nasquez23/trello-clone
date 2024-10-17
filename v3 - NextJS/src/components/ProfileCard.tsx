"use client";

import { updateUserProfile } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const ProfileCard = () => {
  const user = auth.currentUser;
  const [editing, setEditing] = useState(false);

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Profile updated succesfully!");
      setEditing(false);
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

    mutate(data.name);
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
        <Avatar
          src={
            user?.photoURL ||
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          sx={{
            width: 100,
            height: 100,
            margin: "0 auto",
            marginBottom: "1rem",
          }}
        />

        <Typography variant="h6">
          {user?.displayName || "Anonymous User"}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "gray", marginBottom: "1rem" }}
        >
          {user?.email}
        </Typography>

        {editing && (
          <>
            <Box
              component="form"
              onSubmit={handleSaveChanges}
              sx={{ width: "100%" }}
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
