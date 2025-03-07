import { Alert } from "@mui/material";

export interface ArticleErrorAlertProps {
  errorMessage: string;
}

export const ArticleErrorAlert = ({ errorMessage }: ArticleErrorAlertProps) => {
  return (
    <Alert data-testid="article-error-alert" severity="error" sx={{ mb: 2 }}>
      {errorMessage}
    </Alert>
  );
};
