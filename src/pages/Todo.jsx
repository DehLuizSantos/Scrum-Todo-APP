import { useState, useEffect } from "react";

import { Button, InputLabel, Input, FormControl } from "@material-ui/core";
import Card from "../components/Card/";
import { db } from "../services/firebase";
import firebase from "firebase";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const AddTodo = (e) => {
    e.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodos([...todos, input]);
    setInput("");
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
    <div>
      <h1>Exemplo Todo</h1>

      <FormControl>
        <InputLabel>Escreve um TODO</InputLabel>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </FormControl>

      <Button type="submit" onClick={AddTodo}>
        Add Todo
      </Button>

      <ul>
        {todos.map((todo, key) => (
          <Card todo={todo} key={key} />
        ))}
      </ul>
    </div>
  );
}
export default Todo;
