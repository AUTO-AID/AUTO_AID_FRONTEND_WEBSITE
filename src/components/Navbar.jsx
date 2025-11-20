import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo_carHero.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Features", id: "features" },
    { label: "Screenshot", id: "screenshot" },
    { label: "Team", id: "team" },
    { label: "Contact", id: "contact" },
    { label: "Download", id: "download" },
  ];

  //  دالة التنقّل
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
React.useEffect(() => {
  const sections = navItems.map((item) => document.getElementById(item.id));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      threshold: 0.6, 
    }
  );

  sections.forEach((sec) => {
    if (sec) observer.observe(sec);
  });

  return () => observer.disconnect();
}, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: { xs: 60, md: 70 },
          display: "flex",
          justifyContent: "center",
          background:
            "linear-gradient(to right, rgba(181, 126, 220, 0.6), rgba(17, 17, 17, 0.6))",
          boxShadow: "none",
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 5 } }}>
          
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="CarHero Logo"
            sx={{
              height: { xs: 110, sm: 150, md: 150 },
              cursor: "pointer",
            }}
            onClick={() => scrollToSection("home")}
          />

          {/* Desktop Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            {navItems.map((item) => (
<Button
  key={item.id}
  onClick={() => scrollToSection(item.id)}
  sx={{
    textTransform: "none",
    fontSize: "1rem",
    color: activeSection === item.id ? "#B57EDC" : "white",
    fontWeight: activeSection === item.id ? "bold" : "normal",
    "&:hover": { color: "#B57EDC" },
  }}
>
  {item.label}
</Button>

            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            sx={{
              color: "white",
              display: { xs: "flex", md: "none" },
            }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background:
              "linear-gradient(to bottom, rgba(181, 126, 220, 0.95), rgba(17, 17, 17, 0.95))",
            width: 250,
            height: "50%",
            color: "white",
            paddingTop: 3,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding>
<ListItemButton
  onClick={() => {
    scrollToSection(item.id);
    setOpen(false);
  }}
  sx={{
    textAlign: "center",
    color: activeSection === item.id ? "#B57EDC" : "white",
    fontWeight: activeSection === item.id ? "bold" : "normal",
    "&:hover": { color: "#B57EDC" },
  }}
>
  {item.label}
</ListItemButton>

            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
export default Navbar;
