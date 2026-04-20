import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the main heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Ayati/i);
  });

  it("renders the tagline", () => {
    render(<Hero />);
    expect(screen.getByText(/The screen companion that actually reflects/i)).toBeInTheDocument();
  });

  it("renders the download button", () => {
    render(<Hero />);
    expect(screen.getByText(/Download for Desktop/i)).toBeInTheDocument();
  });
});
