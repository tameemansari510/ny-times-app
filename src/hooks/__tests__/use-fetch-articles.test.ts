import { act, renderHook } from "@testing-library/react";
import useSWR from "swr";

import { useArticle } from "../../context";
import { Article } from "../../types";
import { useFetchArticles } from "../use-fetch-articles";

jest.mock("swr");
jest.mock("../../context", () => ({
  useArticle: jest.fn(),
}));

describe("useFetchArticles Hook", () => {
  const mockUseSWR = useSWR as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useArticle as jest.Mock).mockReturnValue({ days: 7 }); // Mock context days
  });

  it("should return initial state", () => {
    mockUseSWR.mockReturnValue({ data: null, isLoading: true, error: null });

    const { result } = renderHook(() => useFetchArticles());

    expect(result.current.articles).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("should update articles when data is available", async () => {
    const mockArticles: Article[] = [
      {
        id: 1,
        title: "Test Article",
        byline: "By Author",
        abstract: "Test Abstract",
        url: "https://example.com",
        media: [],
        results: [],
      },
    ];

    mockUseSWR.mockReturnValue({
      data: { results: mockArticles },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useFetchArticles());

    // Simulate useEffect execution
    act(() => {
      result.current.articles = mockArticles;
    });

    expect(result.current.articles).toEqual(mockArticles);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle errors correctly", () => {
    mockUseSWR.mockReturnValue({
      data: null,
      isLoading: false,
      error: "API Error",
    });

    const { result } = renderHook(() => useFetchArticles());

    expect(result.current.articles).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("API Error");
  });
});
