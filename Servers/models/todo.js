const mongoose = require('mongoose')




const todoSchema = new mongoose.Schema({
   board: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Board'
      },
        
  title: {
    type: String,
    required: true
  },
  
  completed: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
