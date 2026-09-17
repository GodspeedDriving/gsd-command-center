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

  it("links to the confirmed Facebook page while no Messenger handle is set", () => {
    render(<Hero />);

    expect(
      screen.getByRole("link", { name: /message us on facebook/i }),
    ).toHaveAttribute("href", business.contact.facebookPageUrl.value);
  });
});
