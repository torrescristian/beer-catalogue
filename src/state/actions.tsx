export const SET_BEER_NAME = 'SET_BEER_NAME';
export const LOAD_MORE = 'LOAD_MORE';
export const SET_LAST_PAGE_FOUND = 'SET_LAST_PAGE_FOUND';
export const SET_SEARCH_FOCUSED = 'SET_SEARCH_FOCUSED';

export const setBeerName = (beerName: string) => ({
  type: SET_BEER_NAME,
  payload: beerName,
});

export const loadMore = () => ({
  type: LOAD_MORE,
});

export const setLastPageFound = (lastPageFound: boolean) => ({
  type: SET_LAST_PAGE_FOUND,
  payload: lastPageFound,
});

export const setSearchFocused = (searchFocused: boolean) => ({
  type: SET_SEARCH_FOCUSED,
  payload: searchFocused,
});
