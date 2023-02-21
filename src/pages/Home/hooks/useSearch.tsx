import { ChangeEvent, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { setBeerName } from '../../../state/actions';
import { useSearchDispatch, useSearchState } from '../../../state/context';
import useFetchQuery from './useFetchQuery';
import useInfinityScroll from './useInfinityScroll';

export default function useSearch() {
  const [recentSearches, setRecentSearches] = useState<string[]>(
    JSON.parse(localStorage.getItem('recentSearches') || '[]')
  );
  const [hasFocus, setHasFocus] = useState(false);
  const { beerName } = useSearchState();
  const dispatch = useSearchDispatch();
  const query = useFetchQuery();
  const suggestions = recentSearches.filter((s) => s.includes(beerName));

  // hooks
  useInfinityScroll();

  useEffect(
    function persistRecentSearches() {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    },
    [recentSearches]
  );

  const debouncedRecentSearchesUpdate = useDebouncedCallback(
    (value: string) => {
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

  // handlers
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    dispatch(setBeerName(value || ''));

    if (!value.trim()) {
      return;
    }

    debouncedRecentSearchesUpdate(value);
  };

  const handleFocusSearch = () => {
    setHasFocus(true);
  };

  return {
    inputProps: {
      onChange: handleChangeSearch,
      onFocus: handleFocusSearch,
      value: beerName,
    },
    recentSearchesProps: {
      recentSearches: suggestions,
      hasFocus,
      setHasFocus,
    },
    query,
  };
}
