import "@testing-library/jest-dom"; // Provides additional matchers

import { render, screen } from "@testing-library/react";

import { ArticleErrorAlert } from "../ArticleErrorAlert"; // Adjust path if needed

describe("ArticleErrorAlert Component", () => {
  test("renders the error alert with the correct message", () => {
    const errorMessage = "Something went wrong!";

    render(<ArticleErrorAlert errorMessage={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByTestId("article-error-alert")).toBeInTheDocument();
  });
});
