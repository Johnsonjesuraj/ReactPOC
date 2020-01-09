const express = require('express');
const path = require('path');


const moment = require('moment');

const app = express();

//middleware
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}
//initialize middleware
app.use(logger);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false})); //for url encoding form-submission
// app.get('/', (req, res)=>{
//     // res.send('<h2>Hi Vini!</h2>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//set static folder
//use is for middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));

//connect to db- mongoose