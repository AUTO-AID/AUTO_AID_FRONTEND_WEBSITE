import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, YouTube, Instagram } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../assets/logo_carHero.png"

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        background: "linear-gradient(to right, #B57EDC, #111111)", 
        color: "white",
      }}
    >

      {/*  Logo */}
   <Box
  component="img"
  src={logo}
  alt="CarHero Logo"
  sx={{
    width: "100%",     
    maxWidth: 300,      
    height: "auto",     
    mb: 2,
  }}
/>


      {/*  Title */}
      {/* <Typography
        variant="h4"
        sx={{
         fontWeight: "bold",
            mb: 1,
            letterSpacing: "1px",
            background: "linear-gradient(90deg, #B57EDC, #000000)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        }}
      >
        Car<span>Hero</span>
      </Typography> */}

      {/*  Social Icons */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          mb: 4,
        }}
      >
        {[Facebook, Twitter, YouTube, GoogleIcon, Instagram].map(
          (Icon, i) => (
            <IconButton
              key={i}
              sx={{
                color: "white",
                width: 45,
                height: 45,
                transition: "0.3s",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #B57EDC, #111111)",
                  color: "white",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Icon />
            </IconButton>
          )
        )}
      </Box>

      {/*  Privacy / Copyright */}
      <Typography sx={{ mb: 1, fontSize: "0.9rem" }}>
        Privacy&nbsp; | &nbsp;Terms and Conditions
      </Typography>

      <Typography sx={{ fontSize: "0.9rem" }}>
          © 2025 CarHero – All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
