const express = require('express');
const app = express();
const port = 5000;
const todos = require('./routes/Todos');
require('dotenv').config();
require('express-async-errors');
const connectDB = require('./connect/connect');
const errorHandler = require('./middleware/errorHandler');
app.use(express.json());
app.use('/api/v1/todos', todos);
app.use(express.static('../public'));

app.use(errorHandler);
const run = async () => {
  try {
    await connectDB("mongodb+srv://nini1234:niniko1234@cluster0.dnowldg.mongodb.net/?retryWrites=true&w=majority");
    app.listen(port, console.log(`server is listening to the port ${port}`));
  } catch (err) {
    console.log(err);
  }
}

run();
