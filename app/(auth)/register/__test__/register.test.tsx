import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QueryClientLayout from "@/components/QueryClientLayout/QueryClientLayout";
import toast from "react-hot-toast";
import Register from "../page";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast");
jest.spyOn(toast, "promise").mockImplementation((promise) => promise);

const RegisterPage = () => (
  <QueryClientLayout>
    <Register />
  </QueryClientLayout>
);

const getEmailInput = () => screen.getByPlaceholderText("input your email");
const getPasswordInput = () =>
  screen.getByPlaceholderText("input your password");
const getRegisterButton = () => screen.getByRole("button");
const getLoginLink = () => screen.getByRole("link");

describe("Register page", () => {
  describe("Render", () => {
    it("render email input", () => {
      render(<RegisterPage />);
      const input = getEmailInput();
      expect(input).toBeInTheDocument();
    });

    it("render password input", () => {
      render(<RegisterPage />);
      const input = getPasswordInput();
      expect(input).toBeInTheDocument();
    });

    it("render register button", () => {
      render(<RegisterPage />);
      const button = getRegisterButton();
      expect(button).toBeInTheDocument();
    });

    it("render login link", () => {
      render(<RegisterPage />);
      const link = getLoginLink();
      expect(link).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should be able to add email", async () => {
      render(<RegisterPage />);

      const input = getEmailInput();
      await userEvent.type(input, "testemail@gmail.com");
      expect(input).toHaveValue("testemail@gmail.com");
    });

    it("should be able to add password", async () => {
      render(<RegisterPage />);

      const input = getPasswordInput();
      await userEvent.type(input, "password");
      expect(input).toHaveValue("password");
    });

    it("show toast error if email or password is empty", async () => {
      render(<RegisterPage />);

      const button = getRegisterButton();
      await userEvent.click(button);
      expect(toast.error).toHaveBeenCalled();
    });

    it("should be able to go to login page", async () => {
      render(<RegisterPage />);

      const link = getLoginLink();
      expect(link).toHaveAttribute("href", "/login");
    });
  });
});
