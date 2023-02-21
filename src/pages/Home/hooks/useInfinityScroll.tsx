import { useEffect } from "react";
import { loadMore } from "../../../state/actions";
import { useSearchDispatch } from "../../../state/context";

export default function useInfinityScroll() {
  const dispatch = useSearchDispatch()

  useEffect(
    function infiniteScroll() {
      const handleScroll = () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const { scrollTop } = document.documentElement;

        if (innerHeight + scrollTop >= scrollHeight) {
          dispatch(loadMore());
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    },
    [loadMore]
  );
}
