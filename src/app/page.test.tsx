import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/marketing/hero";
import { business } from "@/config/business";

describe("Hero", () => {
  it("shows the tagline and a link to the reservation flow", () => {
    render(<Hero />);

    expect(screen.getByText(business.tagline)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /check available slots/i }),
    ).toHaveAttribute("href", "/reserve");
  });

  it("does not show a Messenger button until the page handle is confirmed", () => {
    render(<Hero />);

    expect(
      screen.queryByRole("link", { name: /message us on messenger/i }),
    ).not.toBeInTheDocument();
  });
});
