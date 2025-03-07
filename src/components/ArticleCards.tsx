import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { DETAIL } from "../constants";
import { Article } from "../types";

export interface ArticleCardsProps {
  articles: Article[];
  handleOpen: (article: Article) => void;
}

export const ArticleCards = ({ articles, handleOpen }: ArticleCardsProps) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const getArticleImg = (article: Article) => {
    const mediaMetadata = article?.media?.[0]?.["media-metadata"].find(
      (img) => img.format === "mediumThreeByTwo440"
    );
    return mediaMetadata?.url || "/noimage.jpg";
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (
    id: number,
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const imgElement = event.currentTarget;
    imgElement.src = "/noimage.jpg"; // Set the fallback image
    setLoadedImages((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        },
        gap: 3,
        width: "100%",
      }}
    >
      {articles.map((article) => {
        const articleImgUrl = getArticleImg(article);
        const isImageLoaded = loadedImages[article.id];

        return (
          <Card
            data-testid={`article-card-container-${article.id}`}
            key={article.id}
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box
              sx={{
                width: "100%",
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              {!isImageLoaded && (
                <CircularProgress
                  data-testid={`article-card-progress${article.id}`}
                />
              )}
              <Box
                data-testid={`article-card-img-${article.id}`}
                component="img"
                src={articleImgUrl}
                alt={article.title}
                onLoad={() => handleImageLoad(article.id)}
                onError={(e) => handleImageError(article.id, e)}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: isImageLoaded ? "block" : "none",
                }}
              />
            </Box>
            <CardContent
              data-testid={`article-card-content-${article.id}`}
              sx={{ flexGrow: 1 }}
            >
              <Typography
                data-testid={`article-card-title-${article.id}`}
                variant="h6"
                gutterBottom
              >
                {article.title}
              </Typography>
              <Typography
                data-testid={`article-card-byline-${article.id}`}
                variant="body2"
                color="textSecondary"
              >
                {article.byline}
              </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <CardActions
              data-testid={`article-card-action-${article.id}`}
              sx={{ justifyContent: "center", pb: 2 }}
            >
              <Button
                data-testid={`article-card-detail-button-${article.id}`}
                variant="contained"
                color="primary"
                onClick={() => handleOpen(article)}
              >
                {DETAIL}
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};
