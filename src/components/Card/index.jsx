import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

import "./styles.scss";

function Card(props) {
  return (
    <List>
      <ListItemAvatar>
        <Avatar>UI</Avatar>
      </ListItemAvatar>
      <ListItem>
        <ListItemText primary={props.text}> {props.text} </ListItemText>
      </ListItem>
    </List>
  );
}

export default Card;
