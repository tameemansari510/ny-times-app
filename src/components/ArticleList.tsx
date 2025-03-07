import { Container } from "@mui/material";

import { EMPTY, ERROR, TITLE } from "../constants";
import { useArticle } from "../context";
import { useFetchArticles } from "../hooks";
import { Article } from "../types";
import { ArticleCards } from "./ArticleCards";
import { ArticleDetailModal } from "./ArticleDetailModal";
import { ArticleEmpty } from "./ArticleEmpty";
import { ArticleErrorAlert } from "./ArticleErrorAlert";
import { ArticleLoadProgress } from "./ArticleLoadProgress";
import { ArticlePeriodSelectMenuItem } from "./ArticlePeriodSelectMenuItem";
import { ArticleTitle } from "./ArticleTitle";

export const ArticleList = () => {
  const { setSelectedArticle, setOpen, setDays } = useArticle();
  const { articles, isLoading, error } = useFetchArticles();

  const handleOpen = (article: Article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  const handleSelectedDays = (selectDay: number) => {
    setDays(selectDay);
  };

  return (
    <Container data-testid="article-container" maxWidth="md">
      <ArticleTitle data-testid="article-title" title={TITLE} />
      <ArticlePeriodSelectMenuItem
        data-testid="article-period-select-menu"
        handleSelectedDays={handleSelectedDays}
      />
      {isLoading ? (
        <ArticleLoadProgress data-testid="article-loading-progress" />
      ) : error ? (
        <ArticleErrorAlert
          data-testid="article-error-alert"
          errorMessage={ERROR}
        />
      ) : articles.length === 0 ? (
        <ArticleEmpty data-testid="article-empty" emptyMessage={EMPTY} />
      ) : (
        <ArticleCards
          data-testid="article-cards"
          articles={articles}
          handleOpen={handleOpen}
        />
      )}
      <ArticleDetailModal
        data-testid="article-detail-modal"
        handleClose={handleClose}
      />
    </Container>
  );
};
