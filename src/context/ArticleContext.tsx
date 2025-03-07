import * as React from "react";

import { Article } from "../types";

export interface ArticleContextProps {
  selectedArticle: Article;
  setSelectedArticle: (selectedArticle: Article | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  days: number;
  setDays: (days: number) => void;
}

const ArticleContext = React.createContext<ArticleContextProps | null>(null);

export { ArticleContext };
