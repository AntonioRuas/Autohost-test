import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Grid2 as Grid,
} from "@mui/material";
import ProfileList from "./components/ProfileList";
import ProfileForm from "./components/ProfileForm";
import SelectedProfile from "./components/SelectedProfile";
import { getAllCountries } from "src/queries/countries";
import { IProfile, IFormData } from "src/interfaces/home";

// Main component for challenges
const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<IProfile[]>([]);
  const [selected, setSelected] = useState<IProfile | null>(null);

  const fetchCountries = () => {
    setLoading(true);
    getAllCountries()
      .then((data) => {
        setCountries(data);
        setError("");
      })
      .catch((err: AxiosError) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleRetry = () => {
    fetchCountries();
  };

  const addProfile = (value: IFormData) => {
    const profile: IProfile = { ...value, submittedAt: new Date() };
    setData([profile, ...data]);
    setSelected(profile);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 2,
        }}
      >
        <Typography color="warning" sx={{ mb: 2 }}>
          {error}
        </Typography>
        <Button variant="contained" onClick={handleRetry}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <ProfileList data={data} selected={selected} setSelected={setSelected} />
      <Grid size={6}>
        <ProfileForm countries={countries} addProfile={addProfile} />
        <SelectedProfile selected={selected} />
      </Grid>
    </Grid>
  );
};

export default Home;
