require('dotenv').config();

const express = require('express');
// const morgan = require('morgan');

const path = require('path');
const cors = require('cors');


const session = require('express-session'); 
const FileStore = require('session-file-store')(session); 

const PORT = process.env.PORT ?? 3003; 

const userRouter = require('./routes/userRouter');
const todoRouter = require('./routes/todoRouter');


const app = express();
app.use(cors({
    credentials: true,
    origin: true,
  
  }));

// app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public'))); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(   
   session({                             
      name: 'sid',                      
      store: new FileStore(),   
      secret: process.env.SECRET, 
      resave: false,                         
      saveUninitialized: false,       
      cookie: { httpOnly: true }, 
}),
);

app.use((req, res, next) => { 
res.locals.user = req.session?.user;
next();
});


app.use('/user', userRouter);
app.use('/todo', todoRouter)

app.use((req, res) => { 
res.status(404).send('ooops');
});

app.listen(PORT, () => {
console.log('server start on', PORT);
});