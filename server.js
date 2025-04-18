const express = require('express');
var bodyParser = require('body-parser')
const errorHandler = require('./middleware/error');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const validateToken = require('./middleware/auth');
const users = require("./routes/user")
const auth = require("./routes/auth")

const app = express();
const port = process.env.PORT || 5000;

// database connection
connectDB();

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(errorHandler);

// routers
app.use("/api/users", validateToken, users);
app.use("/api/", auth);

// start of server 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});