const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Meow! :smile_cat:'
    });
});

app.post('/mews', (req, res) => {
    console.log(req.body);
});

app.listen(5000, () => {
    console.log("Listening on port 5000!");
});