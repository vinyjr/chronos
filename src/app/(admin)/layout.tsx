"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

      {/* Mobile Menu Button */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1000,
        }}
      >
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{
            background: "linear-gradient(135deg, #303633 0%, #465b52 100%)",
            color: "#fff",
            width: 48,
            height: 48,
            borderRadius: "10px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 4px 12px rgba(48, 54, 51, 0.2)",

            "&:hover": {
              transform: "scale(1.05) translateY(-2px)",
              boxShadow: "0 8px 20px rgba(48, 54, 51, 0.3)",
              background: "linear-gradient(135deg, #465b52 0%, #303633 100%)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
