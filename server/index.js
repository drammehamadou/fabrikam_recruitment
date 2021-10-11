const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(' Hello amadou');
})

app.listen(2021, () => {
    console.log('Server is running http://localhost:2021');
})