import { fireEvent, render, screen } from "@testing-library/react";

import { DAYS, SELECT_DAYS } from "../../constants";
import { useArticle } from "../../context";
import { ArticlePeriodSelectMenuItem } from "../ArticlePeriodSelectMenuItem";

jest.mock("../../context", () => ({
  useArticle: jest.fn(),
}));

jest.mock("../../constants", () => ({
  SELECT_DAYS: "Select Days",
  DAYS: {
    ONE: "1 Day",
    SEVEN: "7 Days",
    THIRTY: "30 Days",
  },
}));

describe("ArticlePeriodSelectMenuItem", () => {
  const handleSelectedDays = jest.fn();

  beforeEach(() => {
    (useArticle as jest.Mock).mockReturnValue({
      days: 1,
    });
  });

  test("renders the form control with the correct label", () => {
    render(
      <ArticlePeriodSelectMenuItem handleSelectedDays={handleSelectedDays} />
    );

    expect(
      screen.getByTestId("article-period-select-item-form")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("article-period-select-item-input-label")
    ).toHaveTextContent(SELECT_DAYS);
  });

  test("renders the select component with the correct default value", () => {
    render(
      <ArticlePeriodSelectMenuItem handleSelectedDays={handleSelectedDays} />
    );

    const selectElement = screen.getByTestId(
      "article-period-select-item-select"
    );
    expect(selectElement).toHaveTextContent(DAYS.ONE); // Default value is 1 day
  });

  test("renders all menu items with correct values", async () => {
    render(
      <ArticlePeriodSelectMenuItem handleSelectedDays={handleSelectedDays} />
    );

    const selectCombobox = screen.getByRole("combobox", {
      name: /Select Days/i,
    });
    fireEvent.mouseDown(selectCombobox);

    expect(
      await screen.findByTestId("article-period-select-item-menu-1")
    ).toHaveTextContent("1 Day");
    expect(
      await screen.findByTestId("article-period-select-item-menu-7")
    ).toHaveTextContent("7 Days");
    expect(
      await screen.findByTestId("article-period-select-item-menu-30")
    ).toHaveTextContent("30 Days");
  });

  test("calls handleSelectedDays with the correct value when a menu item is selected", async () => {
    render(
      <ArticlePeriodSelectMenuItem handleSelectedDays={handleSelectedDays} />
    );

    const selectCombobox = screen.getByRole("combobox", {
      name: /Select Days/i,
    });
    fireEvent.mouseDown(selectCombobox);

    const menuItem = await screen.findByText("7 Days");
    fireEvent.click(menuItem);

    expect(handleSelectedDays).toHaveBeenCalledWith(7);
  });

  test("updates the selected value when the context changes", () => {
    (useArticle as jest.Mock).mockReturnValue({
      days: 30,
    });

    render(
      <ArticlePeriodSelectMenuItem handleSelectedDays={handleSelectedDays} />
    );

    const selectElement = screen.getByTestId(
      "article-period-select-item-select"
    );
    expect(selectElement).toHaveTextContent(DAYS.THIRTY);
  });
});
