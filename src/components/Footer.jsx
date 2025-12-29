import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, YouTube, Instagram } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../assets/logo_carHero.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();

  const socialIcons = [Facebook, Twitter, YouTube, GoogleIcon, Instagram];

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        background: "var(--gradient)",
        color: "var(--text-light)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo - Moved from Navbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box
          component="img"
          src={logo}
          alt={t("footer.logoAlt") || "CarHero Logo"}
          sx={{
            display: "block",
            mx: "auto",
            width: "100%",
            maxWidth: 320,
            height: "auto",
            mb: 3,
            filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.2))",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        />
      </motion.div>

      {/* Tagline */}
      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.15rem" },
          mb: 4,
          opacity: 0.9,
          maxWidth: 400,
          mx: "auto",
          lineHeight: 1.6,
        }}
      >
        {t("footer.tagline") || "Your trusted roadside assistance partner"}
      </Typography>

      {/* Social Icons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        {socialIcons.map((Icon, i) => (
          <IconButton
            key={i}
            sx={{
              color: "var(--text-light)",
              width: 48,
              height: 48,
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255,255,255,0.15)",
                transform: "translateY(-4px)",
                borderColor: "rgba(255,255,255,0.4)",
              },
            }}
          >
            <Icon />
          </IconButton>
        ))}
      </Box>

      {/* Divider */}
      <Box
        sx={{
          width: "60%",
          maxWidth: 400,
          height: 1,
          background: "rgba(255,255,255,0.15)",
          mx: "auto",
          mb: 3,
        }}
      />

      {/* Privacy / Terms */}
      <Typography
        sx={{
          mb: 1.5,
          fontSize: { xs: "0.85rem", sm: "0.95rem" },
          opacity: 0.85,
          "& a": {
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          },
        }}
      >
        {t("footer.privacy") || "Privacy | Terms and Conditions"}
      </Typography>

      {/* Copyright */}
      <Typography
        sx={{
          fontSize: { xs: "0.8rem", sm: "0.9rem" },
          opacity: 0.7,
        }}
      >
        {t("footer.copyright") || "© 2025 CarHero – All rights reserved."}
      </Typography>
    </Box>
  );
};

export default Footer;
