import { fireEvent, render, screen } from "@testing-library/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

describe("Dialog", () => {
  it("keeps centering transforms on the shell when the pop animation runs", () => {
    render(
      <Dialog>
        <DialogTrigger>Join Waitlist</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join the waitlist</DialogTitle>
            <DialogDescription>Early access updates.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByRole("button", { name: /join waitlist/i }));

    const dialog = screen.getByRole("dialog", { name: /join the waitlist/i });

    expect(dialog).toHaveClass("left-1/2");
    expect(dialog).toHaveClass("top-1/2");
    expect(dialog).toHaveClass("-translate-x-1/2");
    expect(dialog).toHaveClass("-translate-y-1/2");
    expect(dialog).not.toHaveClass("data-[state=open]:animate-hero-waitlist-pop");
    expect(dialog.firstElementChild).toHaveClass(
      "group-data-[state=open]:animate-hero-waitlist-pop",
    );
  });
});
