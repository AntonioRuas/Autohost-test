import React from "react";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

// Layout Component with Header and Footer
const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" fontWeight="bold">
            Autohost Challenges
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            maxWidth: 960,
            width: "100%",
            mx: "auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
      <Box
        sx={{
          borderWidth: "1px 0 0 0",
          borderStyle: "solid",
          borderColor: "text.disabled",
        }}
      >
        <Typography sx={{ fontSize: "12px", textAlign: "right", p: 1 }}>
          Created by Antonio Ruas
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
