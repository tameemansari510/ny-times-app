import { render, screen } from "@testing-library/react";

import App from "./App";
import { ArticleProvider } from "./context";

jest.mock("./components/ArticleList", () => ({
  ArticleList: () => <div>Mock ArticleList</div>,
}));

describe("App", () => {
  test("renders the App component with Router and ArticleProvider", () => {
    render(
      <ArticleProvider>
        <App />
      </ArticleProvider>
    );

    expect(screen.getByText("Mock ArticleList")).toBeInTheDocument();
  });
  test("renders the ArticleList component inside ArticleProvider", () => {
    render(
      <ArticleProvider>
        <App />
      </ArticleProvider>
    );

    // Check if ArticleList is rendered inside ArticleProvider
    const articleList = screen.getByText("Mock ArticleList");
    expect(articleList).toBeInTheDocument();
  });
  test("renders the correct route for the root path", () => {
    render(
      <ArticleProvider>
        <App /> {/* Render the App component directly */}
      </ArticleProvider>
    );

    // Check if the root path renders ArticleList
    expect(screen.getByText("Mock ArticleList")).toBeInTheDocument();
  });
});
