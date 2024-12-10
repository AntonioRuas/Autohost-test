import React from "react";
import { Grid2 as Grid, Button, Typography } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { format } from "date-fns";
import { IProfile } from "src/interfaces/home";

interface ProfileListProps {
  data: IProfile[];
  selected: IProfile | null;
  setSelected: (value: IProfile) => void;
}

interface ProfileItemProps {
  index: number;
  style: any;
}

// List for all profiles with react virtualized
const ProfileList: React.FC<ProfileListProps> = ({
  data,
  selected,
  setSelected,
}) => {
  const ProfileItem: React.FC<ProfileItemProps> = ({ index, style }) => {
    const item = data[index];
    const isSelected =
      selected?.submittedAt.toISOString() === item.submittedAt.toISOString();

    return (
      <Button
        fullWidth
        variant={isSelected ? "contained" : "text"}
        sx={{ height: 40, textTransform: "none", fontWeight: "bold" }}
        style={style}
        onClick={() => setSelected(item)}
      >
        {`Profile submitted at ${format(
          item.submittedAt,
          "yyyy-MM-dd hh:mm:ss"
        )}`}
      </Button>
    );
  };

  return (
    <Grid size={6}>
      {data.length ? (
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              width={width}
              height={height}
              itemCount={data.length}
              itemSize={40}
            >
              {ProfileItem}
            </List>
          )}
        </AutoSizer>
      ) : (
        <Typography textAlign="center" color="primary">
          No profiles yet!
        </Typography>
      )}
    </Grid>
  );
};

export default ProfileList;
