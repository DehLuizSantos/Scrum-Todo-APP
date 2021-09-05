import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Modal,
} from "@material-ui/core";
import { db } from "../../services/firebase";

import "./styles.scss";

function Card(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleDelete = (event) => {
    db.collection("todos").doc(props.todo.id).delete();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOnClose = () => {
    setOpen(false);
  };

  const handleUpdateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleOnClose} className="modal">
        <div className="modal-edit">
          <h1>open</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={handleOnClose}>Fechar</Button>
          <Button onClick={handleUpdateTodo}>Editar todo</Button>
        </div>
      </Modal>
      <List>
        <ListItemAvatar>
          <Avatar>UI</Avatar>
        </ListItemAvatar>
        <ListItem>
          <ListItemText primary={props.todo.todo} />
          <Button onClick={handleDelete}>Delete</Button>
        </ListItem>
        <Button onClick={handleOpen}>Editar</Button>
      </List>
    </>
  );
}

export default Card;
