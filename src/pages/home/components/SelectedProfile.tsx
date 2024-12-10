import React from "react";
import { Box, Typography } from "@mui/material";
import { IProfile } from "src/interfaces/home";

interface SelectedProfileProps {
  selected: IProfile | null;
}

// Component to show the selected profile
const SelectedProfile: React.FC<SelectedProfileProps> = ({ selected }) => {
  const renderedData = JSON.stringify(selected || {}, null, 4);

  if (!selected) {
    return (
      <Typography textAlign="center" color="primary">
        No selected Profiles to show!
      </Typography>
    );
  }

  return (
    <Box>
      <Typography fontSize={18} color="primary">
        Selected Profile:
      </Typography>
      <Typography sx={{ whiteSpace: "pre-wrap", px: 2 }}>
        {renderedData}
      </Typography>
    </Box>
  );
};

export default SelectedProfile;
