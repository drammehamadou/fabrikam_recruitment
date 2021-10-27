const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

//environment variables
require('dotenv/config');

app.use(cors());
app.options('*', cors);

//middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routes
const coursesRoutes = require('./routes/courses');
const trainingsRoutes = require('./routes/trainings');
const attendeesRoutes = require('./routes/attendees');
const bookingsRoutes = require('./routes/bookings');

const api = process.env.API_URL;

app.use(`${api}/courses`, coursesRoutes);
app.use(`${api}/trainings`, trainingsRoutes);
app.use(`${api}/attendees`, attendeesRoutes);
app.use(`${api}/bookings`, bookingsRoutes);

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