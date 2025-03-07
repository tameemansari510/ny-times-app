import { render, screen } from "@testing-library/react";

import { ArticleLoadProgress } from "../ArticleLoadProgress";

describe("ArticleLoadProgress Component", () => {
  test("renders the loading spinner", () => {
    render(<ArticleLoadProgress />);

    expect(screen.getByTestId("article-load-progress-box")).toBeInTheDocument();

    expect(screen.getByTestId("article-load-progress")).toBeInTheDocument();
  });
});
