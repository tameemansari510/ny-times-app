import { fireEvent, render, screen } from "@testing-library/react";

import { READ_MORE } from "../../constants";
import { useArticle } from "../../context";
import { ArticleDetailModal } from "../ArticleDetailModal";

jest.mock("../../context", () => ({
  useArticle: jest.fn(),
}));

jest.mock("../../constants", () => ({
  READ_MORE: "Read More",
}));

describe("ArticleDetailModal", () => {
  const handleClose = jest.fn();

  const mockSelectedArticle = {
    title: "Test Article Title",
    byline: "Test Author",
    abstract: "This is a test abstract.",
    url: "https://example.com",
  };

  beforeEach(() => {
    (useArticle as jest.Mock).mockReturnValue({
      selectedArticle: mockSelectedArticle,
      open: true,
    });
  });

  test("renders the modal with article details when open is true", () => {
    render(<ArticleDetailModal handleClose={handleClose} />);

    expect(screen.getByTestId("article-detail-modal")).toBeInTheDocument();
    expect(screen.getByTestId("article-detail-title")).toHaveTextContent(
      mockSelectedArticle.title
    );
    expect(screen.getByTestId("article-detail-subtitle")).toHaveTextContent(
      mockSelectedArticle.byline
    );
    expect(screen.getByTestId("article-detail-abstract")).toHaveTextContent(
      mockSelectedArticle.abstract
    );
    expect(
      screen.getByTestId("article-detail-read-more-button")
    ).toHaveTextContent(READ_MORE);
  });

  test("calls handleClose when the close button is clicked", () => {
    render(<ArticleDetailModal handleClose={handleClose} />);

    const closeButton = screen.getByTestId("article-detail-close-button");
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("does not render the modal when open is false", () => {
    (useArticle as jest.Mock).mockReturnValue({
      selectedArticle: mockSelectedArticle,
      open: false,
    });

    render(<ArticleDetailModal handleClose={handleClose} />);

    expect(
      screen.queryByTestId("article-detail-modal")
    ).not.toBeInTheDocument();
  });

  test('renders the "Read More" button with the correct href', () => {
    render(<ArticleDetailModal handleClose={handleClose} />);

    const readMoreButton = screen.getByTestId(
      "article-detail-read-more-button"
    );
    expect(readMoreButton).toHaveAttribute("href", mockSelectedArticle.url);
    expect(readMoreButton).toHaveAttribute("target", "_blank");
    expect(readMoreButton).toHaveAttribute("rel", "noopener noreferrer");
  });
});
