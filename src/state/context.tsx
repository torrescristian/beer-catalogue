import { createContext, ReactNode, useContext, useReducer } from 'react';
import { initialState, IState, reducer } from './reducer';


// Path: src/state/context.ts

// create all necessary elements to move the search state to the context
const SearchStateContext = createContext<IState | undefined>(undefined);
const SearchDispatchContext = createContext<any | undefined>(undefined);

// Path: src/state/context.ts
// create the provider component
const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
};

// Path: src/state/context.ts
// create the custom hooks to access the context
const useSearchState = () => {
  const context = useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error('useSearchState must be used within a SearchProvider');
  }
  return context;
};

const useSearchDispatch = () => {
  const context = useContext(SearchDispatchContext);
  if (context === undefined) {
    throw new Error('useSearchDispatch must be used within a SearchProvider');
  }
  return context;
};

// Path: src/state/context.ts
// export the provider and the custom hooks
export { SearchProvider, useSearchState, useSearchDispatch };
