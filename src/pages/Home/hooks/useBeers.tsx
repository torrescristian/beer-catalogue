import { useEffect, useState } from 'react';

interface IBeer {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
}

export default function useBeers(query: string, setLastPageFound: (lastPageFound: boolean) => void, lastPageFound: boolean) {
  const [beers, setBeers] = useState<IBeer[]>([]);

  useEffect(
    function filterByQuery() {
      const controller = new AbortController();
      const { signal } = controller;

      if (!query) return;

      const queryUrl = new URL(query);

      const page = queryUrl.searchParams.get('page') || '';
      const perPage = queryUrl.searchParams.get('per_page') || '10';

      if (page === '1') {
        setLastPageFound(false);
      }

      if (page !== '1' && lastPageFound) {
        return;
      }

      fetch(query, { signal })
        .then((res) => res.json())
        .then((data) => {
          if (data.length < +perPage) {
            setLastPageFound(true);
          }

          if (page !== '1') {
            setBeers((prev) => [...prev, ...data]);
            return; 
          }

          setBeers(data)
        });

      return () => {
        controller.abort();
      };
    },
    [query]
  );

  return beers;
}
