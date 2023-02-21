import { useEffect, useReducer, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { PUNK_API } from '../../../config';

const SET_BEER_NAME = 'SET_BEER_NAME';
const LOAD_MORE = 'LOAD_MORE';
const SET_LAST_PAGE_FOUND = 'SET_LAST_PAGE_FOUND';

const setBeerName = (beerName: string) => ({
  type: SET_BEER_NAME,
  payload: beerName,
});

const loadMore = () => ({
  type: LOAD_MORE,
});

const setLastPageFound = (lastPageFound: boolean) => ({
  type: SET_LAST_PAGE_FOUND,
  payload: lastPageFound,
});

interface IState {
  beerName: string;
  page: number;
  perPage: number;
  lastPageFound: boolean;
}

const createQuery = ({ beerName, page, perPage }: IState): string => {
  const url = new URL(PUNK_API);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', perPage.toString());

  if (beerName) {
    url.searchParams.append('beer_name', beerName);
  }
  return url.toString();
};

const loadQueryParams = ({ beerName, page, perPage }: IState) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('page', page.toString());
  urlParams.set('per_page', perPage.toString());
  if (beerName) {
    urlParams.set('beer_name', beerName);
  } else {
    urlParams.delete('beer_name');
  }

  window.history.pushState(
    {},
    '',
    `${window.location.pathname}?${urlParams.toString()}`
  );
};

export default function useFetchQuery() {
  // get initial query by parsing the url params
  const urlParams = new URLSearchParams(window.location.search);

  const [query, setQuery] = useState(() =>
    createQuery({
      beerName: urlParams.get('beer_name') || '',
      page: Number(urlParams.get('page') || 1),
      perPage: Number(urlParams.get('per_page') || 10),
      lastPageFound: false,
    })
  );

  const [state, dispatch] = useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case SET_BEER_NAME: {
          return { ...state, page: 1, beerName: action.payload };
        }
        case LOAD_MORE: {
          return state.lastPageFound ? state : { ...state, page: state.page + 1 };
        }
        case SET_LAST_PAGE_FOUND: {
          return { ...state, lastPageFound: action.payload };
        } 
      }
    },
    {
      beerName: urlParams.get('beer_name') || '',
      page: Number(urlParams.get('page') || 1),
      perPage: Number(urlParams.get('per_page') || 10),
    }
  );

  const debouncedQueryCreation = useDebouncedCallback((_state) => {
    setQuery(createQuery(_state));

    loadQueryParams(_state);
  }, 1000);

  useEffect(() => {
    debouncedQueryCreation(state);
  }, [state.page, state.perPage, state.beerName]);

  return {
    beerName: state.beerName,
    query,
    setBeerName: (_beerName: string) => dispatch(setBeerName(_beerName)),
    loadMore: () => dispatch(loadMore()),
    setLastPageFound: (_lastPageFound: boolean) => dispatch(setLastPageFound(_lastPageFound)),
    lastPageFound: state.lastPageFound,
  };
}
