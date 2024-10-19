import Header from "@/components/header/header";
import ProfileCard from "../profile-card";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

const ProfileView = () => {
  return (
    <>
      <Header />
      <Link href="/">
        <Button
          sx={{
            textTransform: "none",
            color: "white",
            fontSize: "1.1rem",
            marginLeft: "1.5rem",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
          startIcon={<ArrowBack sx={{ fontSize: "1.1rem" }} />}
        >
          Back To Home
        </Button>
      </Link>
      <ProfileCard />
    </>
  );
};

export default ProfileView;
