const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//environment variables
require('dotenv/config');

app.use(cors());
app.options('*', cors);

//middlewares
app.use(express.json());
app.use(morgan('tiny'));

//Routes
const attendeesRouter = require('./routers/attendees');
const bookingsRouter = require('./routers/bookings');
const subjectsRouter = require('./routers/subjects');
const trainingsRouter = require('./routers/trainings');

const api = process.env.API_URL;

app.use(`${api}/attendees`, trainingsRouter);
app.use(`${api}/bookings`, trainingsRouter);
app.use(`${api}/subjects`, trainingsRouter);
app.use(`${api}/trainings`, trainingsRouter);

//database connection
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'fabrikam-db'
})
.then(() =>{
    console.log('Database connection is ready...')
})
.catch((err) => {
    console.log(err);
})

//server
app.listen(2021, () => {
    console.log('Server is running http://localhost:2021');
})