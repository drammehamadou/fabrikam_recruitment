const express = require('express');
const app = express();

//environment variables
require('dotenv/config');

const api = process.env.API_URL;

app.get('/', (req, res) => {
    res.send(' Hello Amadou');
})

app.listen(2021, () => {
    console.log(api);
    console.log('Server is running http://localhost:2021');
})