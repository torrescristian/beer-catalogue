import { useEffect, useState } from 'react';
import { setLastPageFound } from '../../../state/actions';
import { useSearchDispatch, useSearchState } from '../../../state/context';

interface IBeer {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
}

export default function useBeers(query: string) {
  const [beers, setBeers] = useState<IBeer[]>([]);
  const { lastPageFound } = useSearchState();
  const dispatch = useSearchDispatch();

  useEffect(
    function filterByQuery() {
      const controller = new AbortController();
      const { signal } = controller;

      if (!query) return;

      const queryUrl = new URL(query);

      const page = queryUrl.searchParams.get('page') || '';
      const perPage = queryUrl.searchParams.get('per_page') || '10';

      if (page === '1') {
        dispatch(setLastPageFound(false));
      }

      if (page !== '1' && lastPageFound) {
        return;
      }

      fetch(query, { signal })
        .then((res) => res.json())
        .then((data) => {
          if (data.length < +perPage) {
            dispatch(setLastPageFound(true));
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
