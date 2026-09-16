import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { business } from "@/config/business";

describe("Home page", () => {
  it("shows the tagline and a link to the admin login", () => {
    render(<Home />);

    expect(screen.getByText(business.tagline)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /admin login/i })).toHaveAttribute(
      "href",
      "/login",
    );
  });
});
