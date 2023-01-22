const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const express = require('express')
const userRouter = require('./routers/user')

const app = express();

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(userRouter)
require('./db/db')

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))


const mongoose = require('mongoose')
0
mongoose.connect(process.env.MONGO_URL)

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


const PORT = process.env.PORT || 3002;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
); 

process.on("unhandledRejection", (err, promise) => {
	console.log(`Logged Error: ${err.message}`);
	server.close(() => process.exit(1));
  });