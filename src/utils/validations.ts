import * as Yup from "yup";

// Name schema for first name and last name
export const nameSchema = () => {
  return Yup.string().required("This field is required");
};

// Email schema
export const emailSchema = () => {
  return Yup.string()
    .email("This should be email format")
    .required("This field is required");
};

// Phone schema
export const phoneSchema = () => {
  return Yup.string().matches(
    /^(\(\d{3}\) \d{3}-\d{4})?$/,
    "Phone number should have this format: (XXX) XXX-XXXX"
  );
};

// Country schema
export const countrySchema = () => {
  return Yup.string().required("This field is required");
};
