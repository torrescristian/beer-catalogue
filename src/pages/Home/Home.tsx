import {
  Avatar,
  Box,
  Container,
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

  const beers = useBeers(query);

  return (
    <Container sx={{ height: '100%', p: 3 }}>
      <Box>
        <TextField fullWidth variant="outlined" {...inputProps} />
        <RecentSearches {...recentSearchesProps} />
      </Box>
      <List>
        {beers.map((b) => (
          <ListItem alignItems="flex-start" key={b.id}>
            <ListItemAvatar>
              <Avatar
                alt="beer image"
                src={b.image_url}
                sx={{ width: 'auto', maxWidth: '25px', height: 'auto', borderRadius: 0, objectFit: 'contain' }}
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
    </Container>
  );
}
