import { LOAD_MORE, SET_BEER_NAME, SET_LAST_PAGE_FOUND, SET_SEARCH_FOCUSED } from './actions';

export interface IState {
  beerName: string;
  page: number;
  perPage: number;
  lastPageFound: boolean;
  searchFocused: boolean;
}

// create the reducer function
export const reducer = (state: IState, action: any): IState => {
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
    case SET_SEARCH_FOCUSED: {
      return { ...state, searchFocused: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const urlParams = new URLSearchParams(window.location.search);

export const initialState = {
  beerName: urlParams.get('beer_name') || '',
  page: 1,
  perPage: 10,
  lastPageFound: false,
  searchFocused: false,
};
