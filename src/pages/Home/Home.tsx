import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import RecentSearches from './components/RecentSearches';
import useBeers from './hooks/useBeers';
import useSearch from './hooks/useSearch';

export default function Home() {
  const { inputProps, recentSearchesProps, query } = useSearch();

  const beers = useBeers(query, recentSearchesProps.setLastPageFound, recentSearchesProps.lastPageFound);

  return (
    <div>
      <Box>
        <TextField variant="outlined" {...inputProps} />
        <RecentSearches {...recentSearchesProps} />
      </Box>
      <List>
        {beers.map((b) => (
          <ListItem alignItems="flex-start" key={b.id}>
            <ListItemAvatar>
              <Avatar
                alt="beer image"
                src={b.image_url}
                sx={{ width: '100%', height: '100px', borderRadius: 0 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography sx={{ display: 'inline' }} color="text.primary">
                  {b.name}
                </Typography>
              }
              secondary={
                <Typography sx={{ display: 'inline' }} color="text.primary">
                  {b.tagline}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
