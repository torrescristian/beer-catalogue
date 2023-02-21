import { useMemo, useReducer } from 'react';
import { PUNK_API } from '../../../config';

const SET_BEER_NAME = 'SET_BEER_NAME';
const LOAD_MORE = 'LOAD_MORE';

const setBeerName = (beerName: string) => ({
  type: SET_BEER_NAME,
  payload: beerName,
});

const loadMore = () => ({
  type: LOAD_MORE,
});

export default function useFetchQuery() {
  const [state, dispatch] = useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case SET_BEER_NAME: {
          return { ...state, page: 1, beerName: action.payload };
        }
        case LOAD_MORE: {
          return { ...state, page: state.page + 1 };
        }
      }
    },
    {
      beerName: '',
      page: 1,
      perPage: 10,
    }
  );

  const query = useMemo(() => {
    const { beerName, page, perPage } = state;
    const url = new URL(PUNK_API);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', perPage.toString());

    if (beerName) {
      url.searchParams.append('beer_name', beerName);
    }
    return url.toString();
  }, [state.page, state.perPage, state.beerName]);

  return {
    query,
    setBeerName: (beerName: string) => dispatch(setBeerName(beerName)),
    loadMore: () => dispatch(loadMore()),
  };
}
