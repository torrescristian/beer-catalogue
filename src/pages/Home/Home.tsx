import {
  Box,
  ClickAwayListener,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { setSearchFocused } from '../../state/actions';
import { useSearchDispatch } from '../../state/context';
import RecentSearches from './components/RecentSearches';
import useBeers from './hooks/useBeers';
import useSearch from './hooks/useSearch';

export default function Home() {
  const { inputProps, recentSearchesStack, query } = useSearch();
  const dispatch = useSearchDispatch();
  const beers = useBeers(query);

  return (
    <Container sx={{ height: '100%', p: 3 }}>
      <ClickAwayListener
        onClickAway={() => dispatch(setSearchFocused(false))}
      >
        <Box>
          <TextField fullWidth variant="outlined" {...inputProps} />
          <RecentSearches list={recentSearchesStack} />
        </Box>
      </ClickAwayListener>
      <List>
        {beers.map((b) => (
          <ListItem alignItems="flex-start" sx={{ columnGap: 2 }} key={b.id}>
            <ListItemAvatar sx={{ display: 'flex', flexDirection: 'column' }}>
              <img
                alt="beer image"
                src={b.image_url}
                style={{
                  borderRadius: 0,
                  height: 'auto',
                  maxHeight: '100px',
                  objectFit: 'scale-down',
                  width: 'auto',
                }}
                loading="lazy"
              />
            </ListItemAvatar>
            <ListItemText
              sx={{ marginTop: 2 }}
              primary={<Typography color="text.primary">{b.name}</Typography>}
              secondary={
                <Typography color="text.secondary">{b.tagline}</Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
