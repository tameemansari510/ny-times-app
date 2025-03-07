import "@testing-library/jest-dom"; // Provides additional matchers

import { render, screen } from "@testing-library/react";

import { ArticleEmpty } from "../ArticleEmpty"; // Adjust path if needed

describe("ArticleEmpty Component", () => {
  test("renders the empty message correctly", () => {
    const emptyMessage = "No articles available.";

    render(<ArticleEmpty emptyMessage={emptyMessage} />);

    expect(screen.getByTestId("article-empty")).toBeInTheDocument();
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
  });
});
