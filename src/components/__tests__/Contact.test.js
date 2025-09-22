import Contact from "../Contact";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Contact Test Cases", () => {
  it("should load contact page", () => {
    // Render
    render(<Contact />);

    // Quering
    const heading = screen.getByRole("heading");

    // Assertion
    expect(heading).toBeInTheDocument();
  });

  it("should have 2 textboxes", () => {
    render(<Contact />);

    const inputBoxes = screen.getAllByRole("textbox");
    expect(inputBoxes.length).toBe(2);
  });

  it("should have submit button", () => {
    render(<Contact />);

    const button = screen.getByText("Submit");
    expect(button).toBeInTheDocument();
  });

  it("should have submit button", () => {
    render(<Contact />);

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
  });
});
