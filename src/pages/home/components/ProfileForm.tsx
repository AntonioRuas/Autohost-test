import React from "react";
import { Box, TextField, Autocomplete, Button } from "@mui/material";
import * as Yup from "yup";
import useForm from "src/utils/form";
import { IFormData } from "src/interfaces/home";
import * as validators from "src/utils/validations";

const validationSchema = Yup.object().shape({
  firstName: validators.nameSchema(),
  lastName: validators.nameSchema(),
  email: validators.emailSchema(),
  phone: validators.phoneSchema(),
  country: validators.countrySchema(),
});

interface ProfileFormProps {
  countries: string[];
  addProfile: (value: IFormData) => void;
}

// Profile form
const ProfileForm: React.FC<ProfileFormProps> = ({ countries, addProfile }) => {
  const { values, errors, handleChange, handleSubmit } = useForm<IFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
    },
    validationSchema,
  });

  const onSubmit = (data: IFormData) => {
    addProfile(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mb: 4 }}
      data-testid="profile-form"
    >
      <TextField
        fullWidth
        size="small"
        label="First Name"
        value={values.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        error={!!errors.firstName}
        helperText={errors.firstName}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        size="small"
        label="Last Name"
        value={values.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        error={!!errors.lastName}
        helperText={errors.lastName}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        size="small"
        label="Email"
        value={values.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        size="small"
        label="Phone (Optional)"
        value={values.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={!!errors.phone}
        helperText={errors.phone}
        sx={{ mb: 2 }}
      />
      <Autocomplete
        fullWidth
        size="small"
        options={countries}
        value={values.country}
        onChange={(_, value) => handleChange("country", value || "")}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            error={!!errors.country}
            helperText={errors.country}
          />
        )}
        sx={{ mb: 2 }}
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        data-testid="btn-submit"
      >
        Submit
      </Button>
    </Box>
  );
};

export default ProfileForm;
