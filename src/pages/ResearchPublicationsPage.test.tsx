import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { researchPublications } from "../data/researchPublications";
import { ResearchPublicationsPage } from "./ResearchPublicationsPage";

describe("ResearchPublicationsPage", () => {
  it("renders published works separately from the graduate thesis archive", () => {
    render(<ResearchPublicationsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Publications" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(
      researchPublications.length,
    );
    expect(
      screen.getByRole("link", { name: /open official record/i }),
    ).toHaveAttribute("href", expect.stringContaining("doi.org"));
  });
});
