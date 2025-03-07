import * as React from "react";

import { Article } from "../types";
import { ArticleContext } from "./ArticleContext";
interface ArticleProviderProps {
  children: React.ReactNode;
}

export function ArticleProvider({ children }: ArticleProviderProps) {
  const [days, setDays] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [selectedArticle, setSelectedArticle] = React.useState<Article | any>(
    null
  );

  return (
    <ArticleContext.Provider
      value={{
        days,
        open,
        selectedArticle,
        setDays,
        setOpen,
        setSelectedArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}
