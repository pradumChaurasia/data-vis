// Navbar.js

import React from "react";
import {
  Box,
  Input,
  IconButton,
  Avatar,
  Menu,
  Badge,
  Select,
  MenuItem,
} from "@mui/material";
import { ChevronDown, Notifications, Brightness2, WbSunny } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Navbar = ({ toggleTheme, currentTheme }) => {
  const theme = useTheme();

  return (
    <Box
      py={1}
      sx={{
        background: `linear-gradient(to bottom, #2F4F4F, #2c3e50)`,
        marginLeft: 7, // Set the initial margin based on the minimum sidebar width
        transition: "margin-left 0.3s", // Add transition for smooth effect
      }}
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        maxWidth="container.lg"
        marginX="auto"
      >
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="Toggle Theme"
            onClick={toggleTheme}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            {currentTheme === "dark" ? <Brightness2 /> : <WbSunny />}
          </IconButton>    
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
