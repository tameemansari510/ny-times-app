import { render, screen } from "@testing-library/react";

import { ArticleTitle } from "../ArticleTitle";

describe("ArticleTitle Component", () => {
  test("renders the title correctly", () => {
    const testTitle = "Test Article Title";

    render(<ArticleTitle title={testTitle} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByTestId("article-title")).toBeInTheDocument();
  });
});
