require('dotenv').config();

const express = require('express');
const app = express();

const body_parser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

const fieldRouter = require('./routers/fieldRouter');
const millRouter = require('./routers/millRouter');
const harvestRouter = require('./routers/harvestRouter');
const farmRouter = require('./routers/farmRouter');

app.get('/', (req, res) => {
    res.send('Server running...');
});

app.use('/fields', fieldRouter);
app.use('/mills', millRouter);
app.use('/harvests', harvestRouter);
app.use('/farms', farmRouter);


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('App listening on port ' + port);
});
