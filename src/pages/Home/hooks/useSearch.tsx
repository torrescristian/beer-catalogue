import { ChangeEvent, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import useFetchQuery from './useFetchQuery';
import useInfinityScroll from './useInfinityScroll';

export default function useSearch() {
  const [recentSearches, setRecentSearches] = useState<string[]>(
    JSON.parse(localStorage.getItem('recentSearches') || '[]')
  );
  const [hasFocus, setHasFocus] = useState(false);
  const { query, setBeerName, loadMore } = useFetchQuery();

  useInfinityScroll(loadMore);

  const handleChangeSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      if (!value) return;

      setRecentSearches((prev) => {
        // if the value is already in the array, move the value to the top of the array and return the array
        setBeerName(value);

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

  const handleFocusSearch = () => {
    setHasFocus(true);
  };

  const handleBlurSearch = () => {
    setHasFocus(false);
  };

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  return {
    inputProps: {
      onBlur: handleBlurSearch,
      onChange: handleChangeSearch,
      onFocus: handleFocusSearch,
    },
    recentSearchesProps: {
      recentSearches,
      hasFocus: hasFocus,
    },
    query,
  };
}
