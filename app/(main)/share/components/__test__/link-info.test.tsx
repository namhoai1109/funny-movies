import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import toast from "react-hot-toast";
import LinkInfo from "../LinkInfo";
import QueryClientLayout from "@/components/QueryClientLayout/QueryClientLayout";
import { setLogger } from "react-query";

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

jest.mock("react-hot-toast");
jest.spyOn(toast, "promise").mockImplementation((promise) => promise);

const validVideoLink = "https://www.youtube.com/watch?v=kPa7bsKwL-c";
const getImage = () => screen.getByRole("img");
const getTitle = () => screen.getByRole("h3");
const LinkInfoComponent = ({ url }: { url: string }) => {
  return (
    <QueryClientLayout>
      <LinkInfo url={url} />
    </QueryClientLayout>
  );
};

describe("Link Info Component", () => {
  describe("Render", () => {
    it("render image", () => {
      render(<LinkInfoComponent url={validVideoLink} />);

      setTimeout(() => {
        const image = getImage();
        expect(image).toBeInTheDocument();
      }, 1000);
    });

    it("render title", () => {
      render(<LinkInfoComponent url={validVideoLink} />);
      setTimeout(() => {
        const title = getTitle();
        expect(title).toBeInTheDocument();
      }, 1000);
    });
  });

  describe("Behavior", () => {
    it("do not show if link is empty", async () => {
      render(<LinkInfoComponent url={""} />);

      setTimeout(() => {
        const image = getImage();
        const title = getTitle();
        expect(image).not.toBeInTheDocument();
        expect(title).not.toBeInTheDocument();
      }, 1000);
    });
    it("do not show if link is invalid", async () => {
      render(<LinkInfoComponent url={"invalid link"} />);

      setTimeout(() => {
        const image = getImage();
        const title = getTitle();
        expect(image).not.toBeInTheDocument();
        expect(title).not.toBeInTheDocument();
      }, 1000);
    });
  });
});
