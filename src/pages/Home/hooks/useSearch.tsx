import { ChangeEvent } from 'react';
import { setBeerName, setSearchFocused } from '../../../state/actions';
import { useSearchDispatch, useSearchState } from '../../../state/context';
import useFetchQuery from './useFetchQuery';
import useInfinityScroll from './useInfinityScroll';
import useRecentSearches from './useRecentSearches';

export default function useSearch() {
  const { beerName } = useSearchState();
  const dispatch = useSearchDispatch();
  const query = useFetchQuery();
  const { recentSearchesStack, debouncedRecentSearchesUpdate } = useRecentSearches();

  const suggestions = recentSearchesStack.filter((search) => search.includes(beerName));

  // hooks
  useInfinityScroll();

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
    dispatch(setSearchFocused(true));
  };

  return {
    inputProps: {
      onChange: handleChangeSearch,
      onFocus: handleFocusSearch,
      value: beerName,
    },
    recentSearchesStack: suggestions,
    query,
  };
}
