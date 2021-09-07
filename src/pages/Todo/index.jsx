import { useState, useEffect } from "react";

import {
  Button,
  InputLabel,
  Input,
  FormControl,
  Modal,
} from "@material-ui/core";

import { AiOutlinePlusCircle, AiFillCheckCircle } from "react-icons/ai";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import Card from "../../components/Card";

import "./styles.scss";

import { db } from "../../services/firebase";
import firebase from "firebase";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const AddTodo = (e) => {
    e.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodos([...todos, input]);
    setInput("");
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOnClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  return (
    <div className="container">
      <div className="button">
        <Button onClick={handleOpen}>
          <AiOutlinePlusCircle />
          Adicionar card
        </Button>
      </div>

      <div className="todos">
        <div className="todo">
          <h2>
            A fazer <FaThumbsDown />
            <ul>
              {todos.map((todo, key) => (
                <Card todo={todo} key={key} />
              ))}
            </ul>
          </h2>
        </div>
        <div className="todo">
          <h2>
            A fazer <FaThumbsUp />
          </h2>
        </div>
        <div className="todo">
          <h2>
            A fazer <AiFillCheckCircle />
          </h2>
        </div>
      </div>

      <Modal open={open} onClose={handleOnClose} className="modal">
        <div className="modalTodo">
          <FormControl>
            <InputLabel>Escreve um TODO</InputLabel>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </FormControl>

          <Button type="submit" onClick={AddTodo} className="buttonModal">
            Add Todo
          </Button>
        </div>
      </Modal>
    </div>
  );
}
export default Todo;
