require('dotenv').config();

const express = require('express');
const app = express();

const body_parser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

const fieldRouter = require('./routers/fieldRouter');

app.get('/', (req, res) => {
    res.send('Server running...');
});

app.use('/fields', fieldRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port);
});
