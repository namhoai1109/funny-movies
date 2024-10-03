import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QueryClientLayout from "@/components/QueryClientLayout/QueryClientLayout";
import toast from "react-hot-toast";
import RegisterForm from "../RegisterForm";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast");
jest.spyOn(toast, "promise").mockImplementation((promise) => promise);

const RegisterFormComponent = () => (
  <QueryClientLayout>
    <RegisterForm />
  </QueryClientLayout>
);

const getEmailInput = () => screen.getByPlaceholderText("input your email");
const getPasswordInput = () =>
  screen.getByPlaceholderText("input your password");
const getRegisterButton = () => screen.getByRole("button");

describe("Register page", () => {
  describe("Render", () => {
    it("render email input", () => {
      render(<RegisterFormComponent />);
      const input = getEmailInput();
      expect(input).toBeInTheDocument();
    });

    it("render password input", () => {
      render(<RegisterFormComponent />);
      const input = getPasswordInput();
      expect(input).toBeInTheDocument();
    });

    it("render register button", () => {
      render(<RegisterFormComponent />);
      const button = getRegisterButton();
      expect(button).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should be able to add email", async () => {
      render(<RegisterFormComponent />);

      const input = getEmailInput();
      await userEvent.type(input, "testemail@gmail.com");
      expect(input).toHaveValue("testemail@gmail.com");
    });

    it("should be able to add password", async () => {
      render(<RegisterFormComponent />);

      const input = getPasswordInput();
      await userEvent.type(input, "password");
      expect(input).toHaveValue("password");
    });

    it("show toast error if email or password is empty", async () => {
      render(<RegisterFormComponent />);

      const button = getRegisterButton();
      await userEvent.click(button);
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
