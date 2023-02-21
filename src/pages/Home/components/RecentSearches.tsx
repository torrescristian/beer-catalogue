import { List, ListItem, ListItemText } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';

type IProps = {
  recentSearches: string[];
  hasFocus: boolean;
  setBeerName: (beerName: string) => void;
  setHasFocus: (hasFocus: boolean) => void;
};

export default function RecentSearches({
  hasFocus,
  recentSearches,
  setBeerName,
  setHasFocus,
}: IProps) {
  if (!hasFocus || !recentSearches.length) return null;

  const handleClick = (beerName: string) => () => {
    setBeerName(beerName);
    setHasFocus(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setHasFocus(false)}>
      <List
        sx={{ backgroundColor: 'seagreen', position: 'absolute', zIndex: 1 }}
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
