import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileForm from "./ProfileForm";

const COUNTRIES = ["Agentina", "Brazil", "USA"];

const FORM_VALUE = {
  firstName: "test first name",
  lastName: "test last name",
  email: "test email",
  phone: "(123) 456-7890",
  country: "Brazil",
};

// Test for ProfileForm component
describe("Test for ProfileForm component", () => {
  it("renders it correctly", async () => {
    render(<ProfileForm countries={COUNTRIES} addProfile={jest.fn()} />);

    // Check the required field error to be shown
    await userEvent.type(
      screen.getByLabelText("First Name"),
      FORM_VALUE.firstName
    );
    await userEvent.type(
      screen.getByLabelText("Last Name"),
      FORM_VALUE.firstName
    );
    userEvent.click(screen.getByRole("combobox", { name: /Country/i }));
    const optionToSelect = await screen.findByText("Brazil");
    userEvent.click(optionToSelect);
    const btnSubmit = screen.getByTestId("btn-submit");
    await userEvent.click(btnSubmit);
    expect(screen.getByText("This field is required")).toBeInTheDocument();

    // Check the phone format error to be shown
    await userEvent.type(screen.getByLabelText("Email"), FORM_VALUE.firstName);
    expect(screen.queryAllByText("This field is required").length).toEqual(0);
    await userEvent.type(
      screen.getByLabelText("Phone (Optional)"),
      "(123) 456-78"
    );
    expect(
      screen.getByText("Phone number should have this format: (XXX) XXX-XXXX")
    ).toBeInTheDocument();

    // Check the submission is working correctly
    await userEvent.type(screen.getByLabelText("Phone (Optional)"), "90");
    expect(
      screen.queryAllByText(
        "Phone number should have this format: (XXX) XXX-XXXX"
      ).length
    ).toEqual(0);

    await userEvent.click(btnSubmit);
  });
});
