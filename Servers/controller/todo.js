
const Board = require('../models/board')
const Todo = require('../models/todo')
module.exports.createBoard = async (req, res) => {
    const { name } = req.body;

  try {
    const board = new Board({ name });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
module.exports.getBoard = async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
}

module.exports.deleteBoard = async(req,res) => {
    const { id } = req.params;

    try {
      await Todo.deleteMany({ board: id });
      const deletedBoard = await Board.findByIdAndDelete(id);
      const findallbaord = await Board.find()
      if (!deletedBoard) {
        return res.status(404).json({ error: 'Board not found' });
      }
  
      res.json(findallbaord);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}

module.exports.createTodo = async(req,res) => {
    const { title, board } = req.body;

  try {
    const todo = new Todo({ title, board });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
    
}

module.exports.getAlltodo = async(req,res) => {
    const { boardId } = req.params;

    try {
      const todos = await Todo.find({ board: boardId }).sort({ createdAt: -1 });
      res.json(todos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}

module.exports.deleteTodo = async(req,res) => {
    const { id } = req.params;
    try {
      const todo = await Todo.findByIdAndDelete(id);
      const todolist = await Todo.find()
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todolist);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}

module.exports.updateTodo = async(req,res) => {
    const { title, completed } = req.body;
    const id = req.params.id;
  
    try {
      const todo = await Todo.findById({ _id: id });
  
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      todo.title = title || todo.title;
      todo.completed = completed || todo.completed;
   
      const updatedTodo = await todo.save();
  
      res.json(updatedTodo); 
    } catch (error) {
      res.status(500).json({ message: error });
    }
} 