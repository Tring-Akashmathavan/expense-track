import React from "react";
import { Button, Typography, Box } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "90vh",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >

      {/* Sticky Note Style for Quotes */}
      <Box
        sx={{
          backgroundColor: "#f6f5f4",
          color: "#000",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "4px 4px 13px rgba(0, 0, 0, 0.3)",
          display: "inline-block",
          transform: "rotate(-5deg)",
          position: "relative",
          marginBottom: "20px",
          width: "50%",
          textAlign: "center",
        }}
      >
        {/* Pin Icon */}
        <PushPinIcon
          sx={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            fontSize: "3rem",
            color: "#000",
          }}
        />
        <Typography variant="h4" gutterBottom>
          "Save Money And Money Will Save You."
        </Typography>
        <Typography variant="h6" sx={{ fontStyle: "italic" }}>
          – Dave Ramsey
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
