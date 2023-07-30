import { render, screen } from "@testing-library/react";
import React from "react";
import Signup from "../Signup/Signup";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom"; // Includes the toBeInTheDocument() method

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  useNavigate: jest.fn(),
}));

/*
    - Describe block is used to write a test site
    - Inside it, multiple tests can be defined
    - Each test is define using the it keyword
*/
describe("Signup Page", () => {
  beforeEach(() => {
    const useStateMock = jest.fn();
    useState.mockImplementation((init) => [init, useStateMock]);
  });

  it("Login button exists and redirects to Login page", () => {
    const loginRedirect = jest.fn();
    const component = (
      <Signup
        signedUpCallback={""}
        loginRedirect={loginRedirect}
      />
    );
    render(<Router> {component} </Router>);
    const button = screen.getByRole("button", { name: "Log in" });
    expect(button).toBeInTheDocument();
    expect(button.closest("a")).toHaveAttribute("href", "/");
  });
});
