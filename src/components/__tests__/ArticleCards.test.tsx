import { fireEvent, render, screen } from "@testing-library/react";

import { Article } from "../../types";
import { ArticleCards } from "../ArticleCards";

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Test Article 1",
    byline: "By Test Author 1",
    media: [
      {
        "media-metadata": [
          {
            url: "https://example.com/image1.jpg",
            format: "mediumThreeByTwo440",
          },
        ],
      },
    ],
    abstract: "",
    url: "",
    results: [],
  },
  {
    id: 2,
    title: "Test Article 2",
    byline: "By Test Author 2",
    media: [],
    abstract: "",
    url: "",
    results: [],
  },
];

const mockHandleOpen = jest.fn();

describe("ArticleCards", () => {
  test("renders the correct number of article cards", () => {
    render(
      <ArticleCards articles={mockArticles} handleOpen={mockHandleOpen} />
    );

    expect(screen.getAllByTestId(/article-card-container-/)).toHaveLength(
      mockArticles.length
    );
  });

  test("displays a spinner while the image is loading", () => {
    render(
      <ArticleCards articles={mockArticles} handleOpen={mockHandleOpen} />
    );

    expect(screen.getByTestId("article-card-progress1")).toBeInTheDocument();
  });

  test("displays the image after test loads", () => {
    render(
      <ArticleCards articles={mockArticles} handleOpen={mockHandleOpen} />
    );

    const image = screen.getByTestId("article-card-img-1");
    fireEvent.load(image);

    expect(image).toBeVisible();
    expect(
      screen.queryByTestId("article-card-progress1")
    ).not.toBeInTheDocument();
  });

  test("displays a fallback when the image fails to load", () => {
    render(
      <ArticleCards articles={mockArticles} handleOpen={mockHandleOpen} />
    );

    const image = screen.getByTestId("article-card-img-1");
    fireEvent.error(image);

    expect(image).not.toBeVisible();
    expect(screen.getByTestId("article-card-img-1")).toHaveAttribute(
      "src",
      "/noimage.jpg"
    );
  });

  test("displays the article title and byline", () => {
    render(
      <ArticleCards articles={mockArticles} handleOpen={mockHandleOpen} />
    );

    expect(screen.getByTestId("article-card-title-1")).toHaveTextContent(
      "Test Article 1"
    );
    expect(screen.getByTestId("article-card-byline-1")).toHaveTextContent(
      "By Test Author 1"
    );
  });

  test("calls handleOpen when the 'Detail' button is clicked", () => {
    render(
      <ArticleCards articles={mockArticles} handleOpen={mockHandleOpen} />
    );

    const detailButton = screen.getByTestId("article-card-detail-button-1");
    fireEvent.click(detailButton);

    expect(mockHandleOpen).toHaveBeenCalledWith(mockArticles[0]);
  });
});
