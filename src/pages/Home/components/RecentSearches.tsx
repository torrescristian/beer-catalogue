import { List, ListItem, ListItemText } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useSearchDispatch } from '../../../state/context';
import { setBeerName } from '../../../state/actions';

type IProps = {
  recentSearches: string[];
  hasFocus: boolean;
  setHasFocus: (hasFocus: boolean) => void;
};

export default function RecentSearches({
  hasFocus,
  recentSearches,
  setHasFocus,
}: IProps) {
  const dispatch = useSearchDispatch();

  if (!hasFocus || !recentSearches.length) return null;

  const handleClick = (beerName: string) => () => {
    dispatch(setBeerName(beerName));
    setHasFocus(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setHasFocus(false)}>
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
        {recentSearches.map((beerName) => (
          <ListItem key={beerName}>
            <ListItemText primary={beerName} onClick={handleClick(beerName)} />
          </ListItem>
        ))}
      </List>
    </ClickAwayListener>
  );
}
