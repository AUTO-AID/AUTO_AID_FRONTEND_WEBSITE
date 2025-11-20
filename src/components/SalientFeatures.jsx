
import React, { useRef } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import LayersIcon from "@mui/icons-material/Layers";
import ReplayIcon from "@mui/icons-material/Replay";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import LinkIcon from "@mui/icons-material/Link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { motion, useInView } from "framer-motion";
import mockImg from "../assets/hero-pg.png";


const featuresLeft = [
  {
    icon: <HeadphonesIcon />,
    title: "Car Breakdown",
    text: "Your vehicle can ditch you anytime while you are on the roads...",
  },
  {
    icon: <LayersIcon />,
    title: "Flat Tire",
    text: "Flat tires are irritating and can occur even in unexpected situations...",
  },
  {
    icon: <ReplayIcon />,
    title: "No Fuel",
    text: "Get on-demand fuel delivery anywhere, anytime...",
  },
];

const featuresRight = [
  {
    icon: <SwapVertIcon />,
    title: "Locked Car",
    text: "Lost your keys or locked yourself outside? We unlock safely...",
  },
  {
    icon: <LinkIcon />,
    title: "Smoke from Car",
    text: "Seeing smoke? Park safely and request immediate help...",
  },
  {
    icon: <ArrowRightAltIcon />,
    title: "Battery Jumpstart",
    text: "Dead battery? We provide jumpstart service quickly...",
  },
];

const iconWrapperStyle = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(45deg, #B57EDC, #000)",
};

const iconInnerCircle = {
  width: 66,
  height: 66,
  borderRadius: "50%",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconGradientText = {
  background: "linear-gradient(45deg, #B57EDC, #000)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "28px",
};

const SalientFeatures = () => {
    const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
        <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
    <Box
      sx={{
        py: 10,
        px: { xs: 2, md: 10 },
        background: "linear-gradient(to bottom, #fff 70%, #B57EDC20 100%)",
        width: "100%",
      }}
    >
      {/* SECTION TITLE */}
      <Box textAlign="center" mb={6}>
        <Typography
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
          SALIENT FEATURES
        </Typography>

        <Typography sx={{ maxWidth: 700, mx: "auto", color: "#444" }}>
          We understand that your vehicle is one of your prized possessions and
          you rely on it daily. Our perfect emergency on-road services are
          available anytime, anywhere so you never feel stranded.
        </Typography>
      </Box>

      {/* CONTENT GRID */}
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        
        {/* LEFT SIDE CARDS */}
        <Grid item xs={12} md={4}>
          {featuresLeft.map((item, i) => (
            <Paper
              key={i}
              sx={{
                p: 3,
                mb: 4,
                display: "flex",
                gap: 3,
                maxWidth: "350px",
                mx: "auto",
                alignItems: "flex-start",
                transition: "0.3s",
                "&:hover .innerCircle": {
                  background: "linear-gradient(45deg, #B57EDC, #000)",
                },
                "&:hover .innerIcon": {
                  WebkitTextFillColor: "#fff",
                },
              }}
              elevation={0}
            >
              <Box sx={iconWrapperStyle}>
                <Box className="innerCircle" sx={iconInnerCircle}>
                  <span style={iconGradientText} className="innerIcon">
                    {item.icon}
                  </span>
                </Box>
              </Box>

              <Box>
                <Typography sx={{ color: "#B57EDC", fontWeight: "bold", mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: "#444" }}>{item.text}</Typography>
              </Box>
            </Paper>
          ))}
        </Grid>

        {/* CENTER IMAGE — HIDDEN ON MOBILE & TABLET */}
        <Grid
          item
          xs={12}
          md={4}
          textAlign="center"
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
<img
  src={mockImg}
  alt="mock"
  style={{ width: "300px", borderRadius: "12px" }}
/>

        </Grid>

        {/* RIGHT SIDE CARDS */}
        <Grid item xs={12} md={4}>
          {featuresRight.map((item, i) => (
            <Paper
              key={i}
              sx={{
                p: 3,
                mb: 4,
                display: "flex",
                gap: 3,
                maxWidth: "350px",
                mx: "auto",
                alignItems: "flex-start",
                transition: "0.3s",
                "&:hover .innerCircle": {
                  background: "linear-gradient(45deg, #B57EDC, #000)",
                },
                "&:hover .innerIcon": {
                  WebkitTextFillColor: "#fff",
                },
              }}
              elevation={0}
            >
              <Box sx={iconWrapperStyle}>
                <Box className="innerCircle" sx={iconInnerCircle}>
                  <span style={iconGradientText} className="innerIcon">
                    {item.icon}
                  </span>
                </Box>
              </Box>

              <Box>
                <Typography sx={{ color: "#B57EDC", fontWeight: "bold", mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: "#444" }}>{item.text}</Typography>
              </Box>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Box>
    </motion.div>
  );
};

export default SalientFeatures;
