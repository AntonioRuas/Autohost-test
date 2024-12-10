import React, { useState, useEffect } from "react";
import * as Yup from "yup";

interface FormValues {
  [key: string]: any;
}

interface FormErrors {
  [key: string]: string | undefined;
}

// Custom hook to handle form states and validations
const useForm = <T extends FormValues>({
  initialValues,
  validationSchema,
}: {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
}) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (name: string, value: string) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const reset = () => {
    setValues({ ...initialValues });
    setErrors({});
    setIsSubmitted(false);
  };

  const handleSubmit = (callback: (values: T) => void) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      validateValues(callback);
    };
  };

  const handleSchemaError = (err: any) => {
    if (err instanceof Yup.ValidationError) {
      const formattedErrors: FormErrors = err.inner.reduce(
        (acc, error) =>
          error.path ? { ...acc, [error.path]: error.message } : { ...acc },
        {}
      );
      setErrors(formattedErrors);
    }
  };

  const validateOnUpdate = async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (err) {
      handleSchemaError(err);
    }
  };

  const validateValues = async (callback: (values: T) => void) => {
    if (loading) {
      return;
    }
    setLoading(true);
    setIsSubmitted(true);
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      await callback(values);
      reset();
    } catch (err) {
      handleSchemaError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      validateOnUpdate();
    }
  }, [values, isSubmitted]);

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
    reset,
  };
};

export default useForm;
