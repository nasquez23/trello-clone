"use client";

import { useEffect, useState, MouseEvent } from "react";
import { auth } from "@/lib/firebase";
import { Avatar, Typography, Box, Menu, MenuItem } from "@mui/material";
import { User } from "firebase/auth";
import LoadingSpinner from "./LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import { signOutUser } from "@/lib/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      toast.success("You have succesfully logged out.");
    },
  });

  const handleLogout = () => {
    mutate();
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header
      style={{
        color: "white",
        marginTop: "1rem",
        fontWeight: "bold",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="0 2rem"
      >
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          Trello
        </Typography>
        {user ? (
          <>
            <Avatar
              onMouseEnter={handleMenuOpen}
              alt={user.displayName || "User Avatar"}
              src={
                user.photoURL ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                ml: 2,
              }}
            />

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                sx={{ padding: "0.7rem 1.2rem" }}
                onClick={handleMenuClose}
              >
                Profile
              </MenuItem>
              <MenuItem
                sx={{ padding: "0.7rem 1.2rem" }}
                onClick={handleLogout}
                disabled={isPending}
              >
                {isPending ? <LoadingSpinner /> : "Logout"}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Box>
    </header>
  );
};

export default Header;
