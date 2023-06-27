
const mongoose = require('mongoose')
const MONGO_URL = 'mongodb+srv://username:password@cluster0.gjg6m66.mongodb.net/Todo';

const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000,
};
mongoose.connect(MONGO_URL, MONGO_OPTIONS)
.then(() => console.log('Connected to MongoDB database!'))
  .catch((err) => console.error(err)); 
   
mongoose.connection




