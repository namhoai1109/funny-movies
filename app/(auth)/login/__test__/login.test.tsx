import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../page";
import QueryClientLayout from "@/components/QueryClientLayout/QueryClientLayout";
import toast from "react-hot-toast";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast");
jest.spyOn(toast, "promise").mockImplementation((promise) => promise);

const LoginPage = () => (
  <QueryClientLayout>
    <Login />
  </QueryClientLayout>
);

const getEmailInput = () => screen.getByPlaceholderText("input your email");
const getPasswordInput = () =>
  screen.getByPlaceholderText("input your password");
const getLoginButton = () => screen.getByRole("button");
const registerLink = () => screen.getByRole("link");

describe("Login page", () => {
  describe("Render", () => {
    it("render email input", () => {
      render(<LoginPage />);
      const input = getEmailInput();
      expect(input).toBeInTheDocument();
    });

    it("render password input", () => {
      render(<LoginPage />);
      const input = getPasswordInput();
      expect(input).toBeInTheDocument();
    });

    it("render login button", () => {
      render(<LoginPage />);
      const button = getLoginButton();
      expect(button).toBeInTheDocument();
    });

    it("render register link", () => {
      render(<LoginPage />);
      const link = registerLink();
      expect(link).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should be able to add email", async () => {
      render(<LoginPage />);

      const input = getEmailInput();
      await userEvent.type(input, "testemail@gmail.com");
      expect(input).toHaveValue("testemail@gmail.com");
    });

    it("should be able to add password", async () => {
      render(<LoginPage />);

      const input = getPasswordInput();
      await userEvent.type(input, "password");
      expect(input).toHaveValue("password");
    });

    it("show toast error if email or password is empty", async () => {
      render(<LoginPage />);

      const button = getLoginButton();
      await userEvent.click(button);
      expect(toast.error).toHaveBeenCalled();
    });

    it("should be able to click register link", async () => {
      render(<LoginPage />);

      const link = registerLink();
      expect(link).toHaveAttribute("href", "/register");
    });
  });
});
