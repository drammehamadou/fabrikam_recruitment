const express = require('express');
const app = express();

//environment variables
require('dotenv/config');

const api = process.env.API_URL;

//middlewares
app.use(express.json());

app.get(`${api}/trainings`, (req, res) => {
    const training = {
        id: 1,
        name: 'CV writing',
        image: 'some_url'
    }
    res.send(training);
})

app.post(`${api}/trainings`, (req, res) => {
    const newTraining = req.body;
    console.log(newTraining)
    res.send(newTraining);
})

app.listen(2021, () => {
    console.log('Server is running http://localhost:2021');
})