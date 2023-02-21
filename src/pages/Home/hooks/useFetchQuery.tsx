import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { PUNK_API } from '../../../config';
import { useSearchState } from '../../../state/context';
import { initialState, IState } from '../../../state/reducer';

const createQuery = ({ beerName, page, perPage }: IState): string => {
  const url = new URL(PUNK_API);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', perPage.toString());

  if (beerName) {
    url.searchParams.append('beer_name', beerName);
  }
  return url.toString();
};

const loadQueryParams = ({ beerName }: IState) => {
  const urlParams = new URLSearchParams(window.location.search);
  if (beerName) {
    urlParams.set('beer_name', beerName);
  } else {
    urlParams.delete('beer_name');
  }

  window.history.pushState(
    {},
    '',
    urlParams.toString()
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname
  );
};

export default function useFetchQuery() {
  const state = useSearchState();
  const [query, setQuery] = useState(() => createQuery(initialState));

  const debouncedQueryCreation = useDebouncedCallback((_state) => {
    setQuery(createQuery(_state));

    loadQueryParams(_state);
  }, 1000);

  useEffect(() => {
    debouncedQueryCreation(state);
  }, [state.page, state.perPage, state.beerName]);

  return query;
}
