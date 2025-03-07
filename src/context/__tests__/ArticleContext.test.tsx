import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { ArticleContext, ArticleContextProps } from "../ArticleContext";
import { useArticle } from "../use-article";

// Mock context values
const mockContextValue: ArticleContextProps = {
  selectedArticle: {
    id: 1,
    title: "Sample Article",
    abstract: "Test abstract",
    url: "https://example.com",
    byline: "Author Name",
    media: [],
    results: [],
  },
  setSelectedArticle: jest.fn(),
  open: false,
  setOpen: jest.fn(),
  days: 7,
  setDays: jest.fn(),
};

const ArticleConsumer = () => {
  const { days, open, selectedArticle } = React.useContext(ArticleContext)!;

  return (
    <div>
      <p>Days: {days}</p>
      <p>Open: {open.toString()}</p>
      <p>Title: {selectedArticle.title}</p>
    </div>
  );
};

const TestComponent = () => {
  const { setSelectedArticle, setOpen, setDays } =
    React.useContext(ArticleContext)!;

  return (
    <div>
      <button onClick={() => setSelectedArticle(null)}>Select Article</button>
      <button onClick={() => setOpen(true)}>Toggle Open</button>
      <button onClick={() => setDays(30)}>Change Days</button>
    </div>
  );
};

describe("ArticleContext", () => {
  test("ArticleContext.Provider provides correct values", () => {
    render(
      <ArticleContext.Provider value={mockContextValue}>
        <ArticleConsumer />
      </ArticleContext.Provider>
    );

    expect(screen.getByText("Days: 7")).toBeInTheDocument();
    expect(screen.getByText("Open: false")).toBeInTheDocument();
    expect(screen.getByText("Title: Sample Article")).toBeInTheDocument();
  });

  test("useArticle throws an error when used outside ArticleProvider", () => {
    const InvalidConsumer = () => {
      useArticle();
      return null;
    };

    expect(() => {
      render(<InvalidConsumer />);
    }).toThrow("useArticle must be used within a ArticleProvider");
  });

  test("Context setters should be called correctly", () => {
    render(
      <ArticleContext.Provider value={mockContextValue}>
        <TestComponent />
      </ArticleContext.Provider>
    );

    fireEvent.click(screen.getByText("Select Article"));
    expect(mockContextValue.setSelectedArticle).toHaveBeenCalledWith(null);

    fireEvent.click(screen.getByText("Toggle Open"));
    expect(mockContextValue.setOpen).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText("Change Days"));
    expect(mockContextValue.setDays).toHaveBeenCalledWith(30);
  });
});
