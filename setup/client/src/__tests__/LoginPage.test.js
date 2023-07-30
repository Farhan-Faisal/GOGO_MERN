/*
    BOILERPLATE
    - Tests are run by triggering npm test in the client directory
    - Tests need to written in the __tests__ folder (configuration details not mentioned)
    - Each test file needs to end in .test.js
*/

/*
    GENERAL STEPS TO WRITE A TEST
        1. Render the component to be tested
        - If component requires a const prop, need to make that mock data
        - If component requires a function prop, need to define a mock function manually (use jest.fn())
        - If the component uses hooks inside it, need to map that to jest.fn() using jest.mock
            - useState() requires a manual mock implementation for some reason
            - useNavigate requires that the component to be tested to be wrapped inside <Router> tags 
            - Don't know how to handle components with other hooks
        
        2. Get an element from the rendered component
            - can getByText, getByRole (and many more)
            - can apply methods to mimic interaction with the component
        
        3. Have an assertion statement
            - for react, this is expect()
*/

import { render, screen } from "@testing-library/react";
import React from "react";
import Login from "../Login/Login";
import { useState } from "react";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
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
describe("Login Page", () => {
  beforeEach(() => {
    const useStateMock = jest.fn();
    useState.mockImplementation((init) => [init, useStateMock]);
  });

  it("Login button rendered successfully", () => {
    const setSelectedProperty = jest.fn();
    const component = (
      <Login
        loggedInCallBack={"/dashboard"}
        businessLoggedInCallBack={"/business-account"}
        SignUpRedirect={"/signup"}
        setIsBusiness={setSelectedProperty}
      />
    );
    render(<Router> {component} </Router>);
    const template = screen.getByText(/Log in/i);
    expect(template).toBeInTheDocument();
  });

  it("Renders login form with input fields", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("Signup button exists and redirects to signup page", () => {
    const setSelectedProperty = jest.fn();
    const component = (
      <Login
        loggedInCallBack={"/dashboard"}
        businessLoggedInCallBack={"/business-account"}
        SignUpRedirect={"/signup"}
        setIsBusiness={setSelectedProperty}
      />
    );
    render(<Router> {component} </Router>);
    const button = screen.getByRole("button", { name: "Sign Up" });
    expect(button).toBeInTheDocument();
    expect(button.closest("a")).toHaveAttribute("href", "/signup");
  });
});
