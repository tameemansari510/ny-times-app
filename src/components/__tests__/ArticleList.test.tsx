import { fireEvent, render, screen } from "@testing-library/react";

import { useArticle } from "../../context";
import { useFetchArticles } from "../../hooks";
import { Article } from "../../types";
import { ArticleList } from "../ArticleList";

// Mock the hooks and context
jest.mock("../../hooks", () => ({
  useFetchArticles: jest.fn(),
}));

jest.mock("../../context", () => ({
  useArticle: jest.fn(),
}));

// Mock child components
jest.mock("../ArticleTitle", () => ({
  ArticleTitle: () => <div data-testid="article-title">Article Title</div>,
}));

jest.mock("../ArticlePeriodSelectMenuItem", () => ({
  ArticlePeriodSelectMenuItem: ({
    handleSelectedDays,
  }: {
    handleSelectedDays: (days: number) => void;
  }) => (
    <div
      role="combobox"
      aria-label="Select Days"
      data-testid="article-period-select-menu"
    >
      <div onClick={() => handleSelectedDays(1)}>Last 1 Day</div>
      <div onClick={() => handleSelectedDays(7)}>Last 7 Days</div>
      <div onClick={() => handleSelectedDays(30)}>Last 30 Days</div>
    </div>
  ),
}));

jest.mock("../ArticleLoadProgress", () => ({
  ArticleLoadProgress: () => (
    <div data-testid="article-loading-progress">Loading...</div>
  ),
}));

jest.mock("../ArticleErrorAlert", () => ({
  ArticleErrorAlert: () => (
    <div data-testid="article-error-alert">Error Alert</div>
  ),
}));

jest.mock("../ArticleEmpty", () => ({
  ArticleEmpty: () => <div data-testid="article-empty">Empty State</div>,
}));

jest.mock("../ArticleCards", () => ({
  ArticleCards: ({
    articles,
    handleOpen,
  }: {
    articles: Article[];
    handleOpen: (article: Article) => void;
  }) => (
    <div data-testid="article-cards">
      {articles.map((article) => (
        <div key={article.id}>
          <div>{article.title}</div>
          <button
            data-testid={`article-card-detail-button-${article.id}`}
            onClick={() => handleOpen(article)}
          >
            Detail
          </button>
        </div>
      ))}
    </div>
  ),
}));

jest.mock("../ArticleDetailModal", () => ({
  ArticleDetailModal: () => (
    <div data-testid="article-detail-modal">Detail Modal</div>
  ),
}));

describe("ArticleList", () => {
  const mockSetSelectedArticle = jest.fn();
  const mockSetOpen = jest.fn();
  const mockSetDays = jest.fn();

  beforeEach(() => {
    (useArticle as jest.Mock).mockReturnValue({
      setSelectedArticle: mockSetSelectedArticle,
      setOpen: mockSetOpen,
      setDays: mockSetDays,
    });
  });

  test("renders the component", () => {
    (useFetchArticles as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: false,
      error: null,
    });

    render(<ArticleList />);

    // Check if the container and title are rendered
    expect(screen.getByTestId("article-container")).toBeInTheDocument();
    expect(screen.getByTestId("article-title")).toHaveTextContent(
      "Article Title"
    );
  });

  test("displays loading progress when isLoading is true", () => {
    (useFetchArticles as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: true,
      error: null,
    });

    render(<ArticleList />);

    // Check if the loading progress is displayed
    expect(screen.getByTestId("article-loading-progress")).toBeInTheDocument();
  });

  test("displays error alert when there is an error", () => {
    (useFetchArticles as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: false,
      error: "Error fetching articles",
    });

    render(<ArticleList />);

    // Check if the error alert is displayed
    expect(screen.getByTestId("article-error-alert")).toBeInTheDocument();
  });

  test("displays empty state when there are no articles", () => {
    (useFetchArticles as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: false,
      error: null,
    });

    render(<ArticleList />);

    // Check if the empty state is displayed
    expect(screen.getByTestId("article-empty")).toBeInTheDocument();
  });

  test("displays article cards when articles are available", () => {
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
    ];

    (useFetchArticles as jest.Mock).mockReturnValue({
      articles: mockArticles,
      isLoading: false,
      error: null,
    });

    render(<ArticleList />);

    // Check if the article cards are displayed
    expect(screen.getByTestId("article-cards")).toBeInTheDocument();
  });

  test("calls setDays when a period is selected", async () => {
    (useFetchArticles as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: false,
      error: null,
    });

    render(<ArticleList />);

    // Open the dropdown by clicking the Select component
    const selectCombobox = screen.getByRole("combobox", {
      name: /Select Days/i,
    });
    fireEvent.mouseDown(selectCombobox);

    // Find and click the "Last 7 Days" option
    const menuItem = screen.getByText("Last 7 Days");
    fireEvent.click(menuItem);

    // Verify that setDays was called with the correct value
    expect(mockSetDays).toHaveBeenCalledWith(7);
  });

  test("calls setSelectedArticle and setOpen when an article is clicked", () => {
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
    ];

    (useFetchArticles as jest.Mock).mockReturnValue({
      articles: mockArticles,
      isLoading: false,
      error: null,
    });

    render(<ArticleList />);

    // Simulate clicking the "Detail" button for the first article
    const detailButton = screen.getByTestId("article-card-detail-button-1");
    fireEvent.click(detailButton);

    // Check if setSelectedArticle and setOpen were called
    expect(mockSetSelectedArticle).toHaveBeenCalledWith(mockArticles[0]);
    expect(mockSetOpen).toHaveBeenCalledWith(true);
  });
});
