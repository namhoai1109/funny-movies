import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QueryClientLayout from "@/components/QueryClientLayout/QueryClientLayout";
import toast from "react-hot-toast";
import Share from "../page";

jest.mock("react-hot-toast");
jest.spyOn(toast, "promise").mockImplementation((promise) => promise);

const SharePage = () => (
  <QueryClientLayout>
    <Share />
  </QueryClientLayout>
);

const validVideoLink = "https://www.youtube.com/watch?v=kPa7bsKwL-c";
const getInput = () => screen.getByPlaceholderText("input Youtube video URL");
const getShareButton = () => screen.getByRole("button");

describe("Share page", () => {
  describe("Render", () => {
    it("render input", () => {
      render(<SharePage />);
      const input = getInput();
      expect(input).toBeInTheDocument();
    });

    it("render share button", () => {
      render(<SharePage />);
      const button = getShareButton();
      expect(button).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should be able to input link", async () => {
      render(<SharePage />);

      const input = getInput();
      await userEvent.type(input, validVideoLink);
      expect(input).toHaveValue(validVideoLink);
    });

    it("show toast error if submit when text field is empty", async () => {
      render(<SharePage />);

      const button = getShareButton();
      await userEvent.click(button);
      expect(toast.error).toHaveBeenCalled();
    });
    it("show toast error if submit when link is invalid", async () => {
      render(<SharePage />);

      const input = getInput();
      await userEvent.type(input, "abc");
      const button = getShareButton();
      await userEvent.click(button);
      expect(toast.error).toHaveBeenCalled();
    });
    it("show preview link when input is valid", async () => {
      render(<SharePage />);

      const input = getInput();
      await userEvent.type(input, validVideoLink);
      setTimeout(() => {
        expect(screen.getByRole("img")).toBeInTheDocument();
      }, 1000);
    });
  });
});
