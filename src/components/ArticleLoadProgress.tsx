import { Box, CircularProgress } from "@mui/material";

export const ArticleLoadProgress = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      data-testid="article-load-progress-box"
    >
      <CircularProgress data-testid="article-load-progress" />
    </Box>
  );
};
