import { Typography } from "@mui/material";

export interface ArticleEmptyProps {
  emptyMessage: string;
}

export const ArticleEmpty = ({ emptyMessage }: ArticleEmptyProps) => {
  return (
    <Typography
      data-testid="article-empty"
      variant="h6"
      color="textSecondary"
      textAlign="center"
    >
      {emptyMessage}
    </Typography>
  );
};
