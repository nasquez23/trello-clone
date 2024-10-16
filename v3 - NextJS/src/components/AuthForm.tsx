"use client";

import { loginUser, registerUser } from "@/lib/auth";
import { User } from "@/lib/types";
import {
  Box,
  Button,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";

const AuthForm = () => {
  const pathname = usePathname();
  const isLoginPage = pathname.includes("login");
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: isLoginPage ? loginUser : registerUser,
    onSuccess: () => {
      toast.success(`Succesfully ${isLoginPage ? "logged in" : "registered"}!`);
      router.push("/");
    },
    onError: (error) => {
      toast.error(error?.message as string);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };

    const userData: User = {
      email: data.email,
      password: data.password,
    };
    mutate(userData);
  };

  return (
    <>
      <Box sx={{ marginTop: "2rem" }}>
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "2.2rem",
            fontFamily: "Montserrat",
          }}
        >
          {isLoginPage ? "Login" : "Register"} to Trello
        </Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{
          width: "35%",
          padding: "2.5rem 4rem",
          margin: "4rem auto 10% auto",
          borderRadius: "10px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InputLabel sx={{ fontWeight: 600 }} htmlFor="email">
            Email
          </InputLabel>
          <Input id="email" type="email" name="email" />
          <InputLabel
            sx={{ marginTop: "1rem", fontWeight: 600 }}
            htmlFor="email"
          >
            Password
          </InputLabel>
          <Input id="password" type="password" name="password" />
          {isPending ? (
            <LoadingSpinner />
          ) : (
            <Button
              sx={{
                marginTop: "1.5rem",
                fontWeight: 600,
                backgroundColor: "#1f51ff",
                "&:hover": {
                  backgroundColor: "#0047ab",
                },
              }}
              type="submit"
              variant="contained"
            >
              {isLoginPage ? "Login" : "Register"}
            </Button>
          )}
          <Typography sx={{ textAlign: "center", marginTop: "1rem" }}>
            {isLoginPage ? "New to the site? " : "Already have an account? "}
            <Typography
              component="span"
              sx={{
                color: "blue",
                "&:hover": {
                  color: "darkblue",
                  textDecoration: "underline",
                },
              }}
            >
              <Link
                style={{ transition: "0.3s" }}
                href={isLoginPage ? "/register" : "/login"}
              >
                {isLoginPage ? "Register " : "Login "}here
              </Link>
            </Typography>
          </Typography>
        </form>
      </Paper>
    </>
  );
};

export default AuthForm;
