import * as React from "react";

import { ArticleContext } from "./ArticleContext";

export function useArticle() {
  const context = React.useContext(ArticleContext);

  if (!context) {
    throw new Error(`useArticle must be used within a ArticleProvider`);
  }

  return context;
}
