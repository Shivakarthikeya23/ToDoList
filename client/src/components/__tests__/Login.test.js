import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";

// Mock AuthContext
const mockLogin = jest.fn();

jest.mock("../../context/AuthContext", () => ({
  AuthProvider: ({ children }) => <>{children}</>,
  useAuth: () => ({
    login: mockLogin,
    user: null,
    loading: false,
  }),
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe("Login Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("renders login form", () => {
    renderLogin();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    renderLogin();
    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    // Check for HTML5 validation messages
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });

  it("handles successful login", async () => {
    // Mock successful login
    mockLogin.mockResolvedValueOnce({
      user: {
        _id: "1",
        username: "testuser",
        email: "test@example.com",
      },
    });

    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Check loading state
    expect(
      screen.getByRole("button", { name: /loading/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("shows error message on login failure", async () => {
    // Mock failed login
    mockLogin.mockRejectedValueOnce({
      response: {
        data: { error: "Invalid credentials" },
      },
    });

    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
