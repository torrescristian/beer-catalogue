import { List, ListItem, ListItemText } from '@mui/material';
import { useSearchDispatch, useSearchState } from '../../../state/context';
import { setBeerName, setSearchFocused } from '../../../state/actions';

type IProps = {
  list: string[];
};

export default function RecentSearches({ list }: IProps) {
  const dispatch = useSearchDispatch();
  const { searchFocused } = useSearchState();

  if (!searchFocused || !list.length) return null;

  const handleClick = (beerName: string) => () => {
    dispatch(setBeerName(beerName));
    dispatch(setSearchFocused(false));
  };

  return (
    <List
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        position: 'absolute',
        zIndex: 1,
        borderRadius: 1,
        mt: 1,
        width: '80%',
      }}
    >
      {list.map((beerName) => (
        <ListItem key={beerName}>
          <ListItemText primary={beerName} onClick={handleClick(beerName)} />
        </ListItem>
      ))}
    </List>
  );
}
