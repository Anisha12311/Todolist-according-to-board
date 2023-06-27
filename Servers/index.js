
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000
const db = require('./config')

const cors = require('cors');
const {createBoard,getBoard,createTodo,deleteBoard,getAlltodo,deleteTodo,updateTodo} = require('./controller/todo')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

const corsOption = {
  origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use(cors())

  

app.post('/board',createBoard)
app.get('/getBoard',getBoard)
app.post('/todo',createTodo)
app.delete('/:id',deleteBoard)
app.get('/:boardId',getAlltodo)
app.delete('/deleteTodo/:id',deleteTodo)
app.put('/updateTodo/:id',updateTodo)
app.listen(port,()=> {
    console.log(`Server is running ${port}`)
  })
  