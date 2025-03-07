import { act, renderHook } from "@testing-library/react";
import { ReactNode } from "react";

import { ArticleContext, ArticleContextProps } from "../ArticleContext";
import { useArticle } from "../use-article";

describe("useArticle Hook", () => {
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

  const wrapper = ({ children }: { children: ReactNode }) => (
    <ArticleContext.Provider value={mockContextValue}>
      {children}
    </ArticleContext.Provider>
  );

  test("should return context value when inside ArticleProvider", () => {
    const { result } = renderHook(() => useArticle(), { wrapper });

    expect(result.current).toEqual(mockContextValue);
  });

  test("should throw error when used outside ArticleProvider", () => {
    expect(() => renderHook(() => useArticle())).toThrow(
      "useArticle must be used within a ArticleProvider"
    );
  });

  test("should call setSelectedArticle when updating selectedArticle", () => {
    const { result } = renderHook(() => useArticle(), { wrapper });

    act(() => {
      result.current.setSelectedArticle(null);
    });

    expect(mockContextValue.setSelectedArticle).toHaveBeenCalledWith(null);
  });

  test("should call setOpen when updating open state", () => {
    const { result } = renderHook(() => useArticle(), { wrapper });

    act(() => {
      result.current.setOpen(true);
    });

    expect(mockContextValue.setOpen).toHaveBeenCalledWith(true);
  });

  test("should call setDays when updating days state", () => {
    const { result } = renderHook(() => useArticle(), { wrapper });

    act(() => {
      result.current.setDays(30);
    });

    expect(mockContextValue.setDays).toHaveBeenCalledWith(30);
  });
});
