import { List, ListItem, ListItemText } from "@mui/material";

type IProps = {
  recentSearches: string[];
  hasFocus: boolean;
};

export default function RecentSearches({
  hasFocus,
  recentSearches,
}: IProps) {
  if (!hasFocus || !recentSearches.length) return null;

  return (
    <List sx={{ backgroundColor: "seagreen" }}>
      {recentSearches.map((s) => (
        <ListItem key={s}>
          <ListItemText primary={s} />
        </ListItem>
      ))}
    </List>
  );
}
