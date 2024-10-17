"use client";

import { auth } from "@/lib/firebase";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";

const ProfileCard = () => {
  const user = auth.currentUser;
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState("");

  const handleSaveChanges = () => {
    setEditing(false);
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
          src={user?.photoURL || "/default-avatar.png"}
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

        {editing ? (
          <>
            <TextField
              label="Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              fullWidth
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{ marginBottom: "1rem" }}
            />
          </>
        ) : (
          <Typography
            variant="body2"
            sx={{ marginBottom: "1rem", color: "gray" }}
          >
            Bio: {bio || "No bio added"}
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {editing ? (
            <>
              <Button
                variant="contained"
                onClick={handleSaveChanges}
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
            </>
          ) : (
            <Button variant="outlined" onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileCard;
