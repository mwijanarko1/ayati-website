import { fireEvent, render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the main heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Ayati/i);
  });

  it("renders the tagline", () => {
    render(<Hero />);
    expect(screen.getByText(/matches verses to your workflow/i)).toBeInTheDocument();
  });

  it("renders the download button", () => {
    render(<Hero />);
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
  });

  it("renders privacy and terms links", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /Privacy Policy/i })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: /Terms of Service/i })).toHaveAttribute("href", "/terms");
  });

  it("opens the waitlist sign-up from the hero", () => {
    render(<Hero />);
    fireEvent.click(screen.getByRole("button", { name: /Join Waitlist/i }));
    expect(screen.getByRole("dialog", { name: /join the waitlist/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email address/i })).toBeInTheDocument();
  });
});
