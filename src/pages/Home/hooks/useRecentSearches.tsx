import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function useRecentSearches() {
  const RECENT_SEARCHES_STACK = 'RECENT_SEARCHES_STACK';
    
  const [recentSearchesStack, setRecentSearchesStack] = useState<string[]>(
    JSON.parse(localStorage.getItem(RECENT_SEARCHES_STACK) || '[]')
  );

  useEffect(
    function persistRecentSearches() {
      localStorage.setItem(RECENT_SEARCHES_STACK, JSON.stringify(recentSearchesStack));
    },
    [recentSearchesStack]
  );

  const debouncedRecentSearchesUpdate = useDebouncedCallback(
    (value: string) => {
      setRecentSearchesStack((prevStack) => {
        // if the value is already in the stack, move the value to the top and return it
        if (prevStack.includes(value)) {
          const newStack = prevStack.filter((p) => p !== value);
          return [value, ...newStack];
        }

        // if not, add the value to the top of the stack and return the last 5 items
        return [value, ...prevStack].slice(0, 5);
      });
    },
    1000,
    { maxWait: 1000 }
  ); 

  return {
    recentSearchesStack,
    debouncedRecentSearchesUpdate,
  };
};
