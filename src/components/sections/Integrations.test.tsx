import { render, screen } from "@testing-library/react";
import { Integrations } from "./Integrations";

describe("Integrations", () => {
  it("renders a logo for every integration", () => {
    render(<Integrations />);

    const expectedIntegrations = [
      "OpenAI",
      "Anthropic",
      "Google Gemini",
      "Quran Foundation",
      "macOS",
      "Windows",
      "Linux",
    ];

    for (const integration of expectedIntegrations) {
      const logo = screen.getByRole("img", { name: `${integration} logo` });

      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", expect.stringMatching(/^\/logos\/.+\.svg$/));
    }
  });
});
