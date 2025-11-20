import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
// ... (Icons imports remain the same) ...
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const features = [
  // ... (features array remains the same) ...
  {
    icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
    title: "24/7 Road Assistance",
    description:
      "Our mechanics are available 24/7 to help you on the road and ensure you're never stranded.",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    title: "Member to Member Service",
    description:
      "Buy and sell used certified cars safely with our trusted community of members.",
  },
  {
    icon: <BuildIcon sx={{ fontSize: 40 }} />,
    title: "Complete Services",
    description:
      "We offer all maintenance and repair services wherever you are — simple, fast, and reliable.",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
    title: "Certified Mechanics",
    description:
      "Our professional and certified mechanics provide trusted, high-quality service.",
  },
  {
    icon: <LocalOfferIcon sx={{ fontSize: 40 }} />,
    title: "Affordable Pricing",
    description:
      "Get the same top-tier service at a lower cost. No hidden fees, just honest work.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
    title: "Support Guarantee",
    description:
      "We ensure quality and safety with every service. Our support team is always ready.",
  },
];

const ServiceSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 6, md: 10 }, 
        px: { xs: 2, sm: 4, md: 8 }, 
        overflowX: "hidden", 
        background: "linear-gradient(to bottom, #fff 70%, #B57EDC20 100%)",
        width: "100%", // تأكيد العرض الكامل
      }}
    >
      
      {/* (تعليق الـ SVG يبقى كما هو) */}

      {/* المحتوى */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
      
        {/* <Typography
          variant="h3" 
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "#111",
            mb: { xs: 4, md: 6 }, 
            fontSize: { xs: "28px", sm: "36px", md: "42px" }, 
          }}
        >
          Our <span style={{ color: "#B57EDC" }}>Features</span>
        </Typography> */}

        <Grid 
          container 
          spacing={{ xs: 3, md: 4 }} 
          justifyContent="center" 
          alignItems="stretch"
        >
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%", maxWidth: 360 }} 
              >
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: "20px",
                    textAlign: "center",
                    padding: { xs: "30px 15px", md: "50px 20px" }, 
                    transition: "all 0.3s ease",
                    color: "#111",
                    height: "100%",
                    "&:hover": {
                      background: "linear-gradient(to right, #B57EDC, #111111)",
                      color: "#fff",
                      "& svg": { color: "#fff" },
                      "& .feature-title": { color: "#fff" } 
                    },
                  }}
                >
                  <Box sx={{ color: "#B57EDC", mb: 2 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    className="feature-title" 
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: "#B57EDC", 
                      transition: "color 0.3s ease",
                      fontSize: { xs: "18px", md: "20px" } 
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    sx={{ 
                        fontSize: { xs: 14, md: 15 }, 
                        lineHeight: 1.6 
                    }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ServiceSection;