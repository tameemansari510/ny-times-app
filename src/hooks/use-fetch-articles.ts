import * as React from "react";
import useSWR from "swr";

import { fetcher } from "../actions";
import { API_KEY } from "../constants";
import { useArticle } from "../context";
import { Article } from "../types";

export const useFetchArticles = () => {
  const { days } = useArticle();
  const [articles, setArticles] = React.useState<Article[]>([]);

  const API_URL = React.useMemo(
    () =>
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/${days}.json?api-key=${API_KEY}`,
    [days]
  );

  const { data, isLoading, error } = useSWR(() => [API_URL], fetcher, {
    revalidateOnFocus: false,
  });

  React.useEffect(() => {
    if (data?.results?.length) {
      setArticles(data.results);
    }
  }, [data]);

  return { articles, isLoading, error };
};
