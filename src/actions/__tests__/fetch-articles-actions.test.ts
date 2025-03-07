import { fetcher } from "../fetch-articles-actions";

describe("fetcher function", () => {
  const fetchUrl = "https://api.example.com/articles";
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it("fetches data successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "success" }),
      })
    ) as jest.Mock;

    const data = await fetcher([fetchUrl]);
    expect(data).toEqual({ message: "success" });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(fetchUrl);
  });

  it("handles fetch failure", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    await expect(fetcher([fetchUrl])).rejects.toThrow("Failed to fetch data");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
