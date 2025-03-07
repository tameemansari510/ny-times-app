import { Typography } from "@mui/material";

export interface ArticleTitleProps {
  title: string;
}

export const ArticleTitle = ({ title }: ArticleTitleProps) => {
  return (
    <Typography
      data-testid="article-title"
      variant="h4"
      gutterBottom
      textAlign="center"
    >
      {title}
    </Typography>
  );
};
