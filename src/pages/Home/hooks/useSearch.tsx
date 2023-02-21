import { ChangeEvent, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import useFetchQuery from './useFetchQuery';
import useInfinityScroll from './useInfinityScroll';

export default function useSearch() {
  const [recentSearches, setRecentSearches] = useState<string[]>(
    JSON.parse(localStorage.getItem('recentSearches') || '[]')
  );
  const [hasFocus, setHasFocus] = useState(false);
  const { query, setBeerName, loadMore, beerName, setLastPageFound, lastPageFound } = useFetchQuery();
  const suggestions = recentSearches.filter((s) => s.includes(beerName));

  useInfinityScroll(loadMore);

  const debouncedRecentSearchesUpdate = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      setRecentSearches((prev) => {
        // if the value is already in the array, move the value to the top of the array and return the array
        if (prev.includes(value)) {
          const newPrev = prev.filter((p) => p !== value);
          return [value, ...newPrev];
        }

        const _recentSearches = [value, ...prev].slice(0, 5);

        return _recentSearches;
      });
    },
    1000
  );

  const handleChangeSearch =
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      setBeerName(value || '');

      if (!value) {
        return;
      };

      debouncedRecentSearchesUpdate(e);
    };

  const handleFocusSearch = () => {
    setHasFocus(true);
  };

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  return {
    inputProps: {
      onChange: handleChangeSearch,
      onFocus: handleFocusSearch,
      value: beerName, // this is causing the input to be uncontrolled
    },
    recentSearchesProps: {
      recentSearches: suggestions,
      hasFocus,
      setBeerName,
      setHasFocus,
      setLastPageFound,
      lastPageFound,
    },
    query,
    beerName,
  };
}
