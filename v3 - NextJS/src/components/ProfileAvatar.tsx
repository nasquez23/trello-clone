import { changeProfilePicture } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { CameraAltOutlined } from "@mui/icons-material";
import { Box, Avatar, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef, ChangeEvent } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const ProfileAvatar = () => {
  const [showChangePhotoBtn, setShowChangePhotoBtn] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files![0]);
  };

  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: changeProfilePicture,
    onSuccess: () => {
      toast.success("Succesfully changed profile picture!");
      setImage(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSaveImage = () => {
    if (image) {
      mutate(image);
    }
  };

  return (
    <>
      <Box
        onClick={() => fileInputRef.current?.click()}
        onMouseEnter={() => setShowChangePhotoBtn(true)}
        onMouseLeave={() => setShowChangePhotoBtn(false)}
        sx={{
          position: "relative",
          width: 150,
          height: 150,
          display: "inline-block",
          marginBottom: "0.5rem",
          borderRadius: "50%",
        }}
      >
        <Avatar
          src={
            image
              ? URL.createObjectURL(image)
              : auth.currentUser?.photoURL ??
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          sx={{
            width: "100%",
            height: "100%",
            margin: "0 auto",
            border: "2px solid lightgray",
          }}
        />
        {showChangePhotoBtn && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              height: "100%",
              color: "white",
              borderRadius: "50%",
            }}
          >
            <CameraAltOutlined sx={{ fontSize: "3rem" }} />
          </Box>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          style={{ display: "none" }}
        />
      </Box>
      {image && !isUploading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "1rem",
            gap: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          <Button
            onClick={handleSaveImage}
            sx={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#1f51ff",
              "&:hover": {
                backgroundColor: "#0047ab",
              },
            }}
          >
            Save Photo
          </Button>
          <Button
            onClick={() => setImage(null)}
            sx={{
              fontWeight: "bold",
              border: "none",
              color: "black",
              "&:hover": {
                backgroundColor: "lightgray",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      ) : isUploading ? (
        <LoadingSpinner />
      ) : null}
    </>
  );
};

export default ProfileAvatar;
