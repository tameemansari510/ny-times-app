export interface Article {
  media: ArticleMedia[];
  id: number;
  title: string;
  abstract: string;
  url: string;
  byline: string;
  results: any[];
}

export interface ArticleMedia {
  "media-metadata": MediaMetadata[];
}

export interface MediaMetadata {
  url: string;
  format: string;
}
