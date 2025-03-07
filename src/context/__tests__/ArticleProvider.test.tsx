import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ArticleContext } from "../ArticleContext";
import { ArticleProvider } from "../ArticleProvider";

describe("ArticleProvider", () => {
  test("provides default values", () => {
    render(
      <ArticleProvider>
        <ArticleContext.Consumer>
          {(context) => (
            <div>
              <p>Days: {context?.days}</p>
              <p>Open: {context?.open.toString()}</p>
              <p>
                Selected Article: {context?.selectedArticle?.title || "None"}
              </p>
            </div>
          )}
        </ArticleContext.Consumer>
      </ArticleProvider>
    );

    expect(screen.getByText("Days: 1")).toBeInTheDocument();
    expect(screen.getByText("Open: false")).toBeInTheDocument();
    expect(screen.getByText("Selected Article: None")).toBeInTheDocument();
  });

  test("updates context values", () => {
    render(
      <ArticleProvider>
        <ArticleContext.Consumer>
          {(context) => (
            <div>
              <button onClick={() => context?.setDays(5)}>Set Days</button>
              <button onClick={() => context?.setOpen(true)}>
                Toggle Open
              </button>
              <button
                onClick={() =>
                  context?.setSelectedArticle({
                    title: "New Article",
                    media: [],
                    id: 0,
                    abstract: "",
                    url: "",
                    byline: "",
                    results: [],
                  })
                }
              >
                Select Article
              </button>
              <p>Days: {context?.days}</p>
              <p>Open: {context?.open.toString()}</p>
              <p>
                Selected Article: {context?.selectedArticle?.title || "None"}
              </p>
            </div>
          )}
        </ArticleContext.Consumer>
      </ArticleProvider>
    );

    userEvent.click(screen.getByText("Set Days"));
    expect(screen.getByText("Days: 5")).toBeInTheDocument();

    userEvent.click(screen.getByText("Toggle Open"));
    expect(screen.getByText("Open: true")).toBeInTheDocument();

    userEvent.click(screen.getByText("Select Article"));
    expect(
      screen.getByText("Selected Article: New Article")
    ).toBeInTheDocument();
  });
});
