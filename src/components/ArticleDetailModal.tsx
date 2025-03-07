import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";

import { READ_MORE } from "../constants";
import { useArticle } from "../context";

export interface ArticleDetailModalProps {
  handleClose: () => void;
}

export const ArticleDetailModal = ({
  handleClose,
}: ArticleDetailModalProps) => {
  const { selectedArticle, open } = useArticle();

  return (
    <Modal data-testid="article-detail-modal" open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          data-testid="article-detail-close-button"
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon data-testid="article-detail-close-icon" />
        </IconButton>
        {selectedArticle && (
          <>
            <Typography
              data-testid="article-detail-title"
              variant="h5"
              gutterBottom
            >
              {selectedArticle.title}
            </Typography>
            <Typography
              data-testid="article-detail-subtitle"
              variant="subtitle1"
              color="textSecondary"
            >
              {selectedArticle.byline}
            </Typography>
            <Typography data-testid="article-detail-abstract" display="block">
              {selectedArticle.abstract}
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                data-testid="article-detail-read-more-button"
                variant="contained"
                color="primary"
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {READ_MORE}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};
