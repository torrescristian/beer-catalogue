import { useEffect } from "react";

export default function useInfinityScroll(loadMore: () => void) {
  useEffect(
    function infiniteScroll() {
      const handleScroll = () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const { scrollTop } = document.documentElement;

        if (innerHeight + scrollTop >= scrollHeight) {
          loadMore();
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
