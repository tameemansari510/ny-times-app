import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";

import { DAYS, SELECT_DAYS } from "../constants";
import { useArticle } from "../context";

export interface ArticlePeriodSelectMenuItemProps {
  handleSelectedDays: (selectedDay: number) => void;
}

export const ArticlePeriodSelectMenuItem = ({
  handleSelectedDays,
}: ArticlePeriodSelectMenuItemProps) => {
  const { days } = useArticle();
  return (
    <FormControl
      data-testid="article-period-select-item-form"
      variant="filled"
      sx={{ m: 1, minWidth: 120 }}
    >
      <InputLabel
        data-testid="article-period-select-item-input-label"
        id="days-select-label"
      >
        {SELECT_DAYS}
      </InputLabel>
      <Select
        data-testid="article-period-select-item-select"
        labelId="days-select-label"
        value={days}
        onChange={(e) => handleSelectedDays(+e.target.value)}
      >
        <MenuItem data-testid="article-period-select-item-menu-1" value={1}>
          {DAYS.ONE}
        </MenuItem>
        <MenuItem data-testid="article-period-select-item-menu-7" value={7}>
          {DAYS.SEVEN}
        </MenuItem>
        <MenuItem data-testid="article-period-select-item-menu-30" value={30}>
          {DAYS.THIRTY}
        </MenuItem>
      </Select>
    </FormControl>
  );
};
