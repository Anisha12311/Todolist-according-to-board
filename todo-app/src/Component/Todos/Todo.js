import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Input } from "semantic-ui-react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import "./Todo.css";
import axiosInstance from "../../Utils/axiosInstance";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  justifyContent: "center",
  pt: 2,
  px: 4,
  pb: 3,
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Todo = (props) => {
  const [value, setValue] = useState("");
  const [todoList, setTodolist] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [todoId, setTodoId] = useState();
  const [editValue, seteditValue] = useState("");

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      return;
    }
    axiosInstance
      .post("/todo", {
        title: value,
        board: props.boardId,
      })
      .then((res) => {
        setTodolist([res.data], ...todoList);
        setValue('')
      })
      .catch((err) => {
        console.log(err)
      })
  };
  useEffect(() => {
    axiosInstance
      .get(`/${props.boardId}`)
      .then((res) => {
        setTodolist(res.data);
      })
      .catch((err) => console.log(err));
  }, [todoList]);

  const deleteTodo = (id) => {
    axiosInstance
      .delete(`/deleteTodo/${id}`)
      .then((res) => {
        setTodolist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateTodo = (id, title) => {
    setOpen(true);
    setTodoId(id);
    seteditValue(title);
  };
  const handleeditSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put(`/updateTodo/${todoId}`, {
        title: editValue,
      })
      .then((res) => {
        setTodolist([res.data]);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCheckboxClick = (id) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo._id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        axiosInstance
          .put(`/updateTodo/${id}`, {
            completed: updatedTodo.completed,
          })
          .then((res) => {
            setTodolist((prevTodoList) =>
              prevTodoList.map((item) =>
                item._id === id ? { ...item, completed: !item.completed } : item
              )
            );
          })
          .catch((err) => {
            console.log(err);
            // Handle errors if necessary
          });

        return updatedTodo;
      }
      return todo;
    });

    setTodolist(updatedTodoList);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Item>
              <h3>New Task</h3>
              {todoList &&
                todoList.map((list, i) => (
                  <>
                    {list.completed === false && (
                      <div className="todo-row">
                        <div>{list.title}</div>
                        <div className="icons">
                          <div onClick={() => deleteTodo(list._id)}>
                            <RiCloseCircleLine className="delete-icon" />
                          </div>
                          <div onClick={() => updateTodo(list._id, list.title)}>
                            <TiEdit className="edit-icon" />
                          </div>
                          <Checkbox
                            {...label}
                            checked={list.completed}
                            onChange={() => handleCheckboxClick(list._id)}
                            sx={{
                              border: "white",
                              background: "white",
                              width: "30px",
                              height: "30px",
                              marginLeft: "10px",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h1>{props.name}</h1>
              <form onSubmit={handleSubmit}>
                <Input
                  style={{ width: "60%", marginBottom: "40px" }}
                  focus
                  placeholder="Enter a task..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </form>
            </Item>
          </Grid>
          <Grid item xs>
            <Item>
              <h3>Complete Task</h3>
              {todoList &&
                todoList.map((list, i) => (
                  <>
                    {list.completed === true && (
                      <div className="todo-row">
                        {" "}
                        <div>{list.title}</div>
                        <div className="icons">
                          <div onClick={() => deleteTodo(list._id)}>
                            <RiCloseCircleLine className="delete-icon" />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </Item>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 500 }}>
            <h2 id="child-modal-title">Edit task</h2>
            <form onSubmit={handleeditSubmit}>
              <Input
                style={{ width: "60%", marginBottom: "40px" }}
                focus
                placeholder="Edit a task..."
                value={editValue}
                onChange={(e) => seteditValue(e.target.value)}
              />
            </form>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default Todo;
