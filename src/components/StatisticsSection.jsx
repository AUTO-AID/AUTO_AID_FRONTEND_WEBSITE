import React, { useRef } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TimerIcon from "@mui/icons-material/Timer";
import MapIcon from "@mui/icons-material/Map";

const StatisticItem = ({ icon: Icon, value, label, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
  >
    <Paper
      elevation={0}
      sx={{
        p: 4,
        textAlign: "center",
        borderRadius: "24px",
        background: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          borderColor: "#8f5cb1",
          "& .stat-icon": {
            transform: "scale(1.1) rotate(5deg)",
            color: "#8f5cb1",
            background: "rgba(143, 92, 177, 0.15)",
          },
        },
      }}
    >
      <Box
        className="stat-icon"
        sx={{
          mb: 2.5,
          p: 2,
          borderRadius: "18px",
          background: "var(--input-bg)",
          color: "var(--primary)",
          display: "inline-flex",
          transition: "all 0.4s ease",
        }}
      >
        <Icon sx={{ fontSize: 40 }} />
      </Box>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          background: "var(--gradient)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <CountUp end={value} duration={2.5} separator="," prefix="+" />
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {label}
      </Typography>
    </Paper>
  </motion.div>
);

const StatisticsSection = () => {
  const { t, i18n } = useTranslation();

  const stats = [
    { icon: PeopleAltIcon, value: 15600, label: t("stats.users") },
    { icon: EngineeringIcon, value: 500, label: t("stats.providers") },
    { icon: MapIcon, value: 7, label: t("stats.cities") },
    { icon: TimerIcon, value: 20, label: t("stats.response_time") },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        px: { xs: 2, md: 10 },
        background: "var(--bg-section)",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
    >
      <Box textAlign="center" mb={7}>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
           <Typography
             variant="h4"
             sx={{
               fontWeight: 800,
               background: "var(--gradient)",
               WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
               mb: 1.5,
               fontSize: { xs: "24px", md: "36px" }
             }}
           >
             {t("stats.title")}
           </Typography>
           <Typography variant="body1" color="var(--text-muted)" maxWidth={600} mx="auto">
             {t("stats.subtitle")}
           </Typography>
         </motion.div>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <StatisticItem {...stat} index={i} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticsSection;
