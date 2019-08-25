require('./config/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./db/mongoose');
const employeeRoutes = require('./controllers/employee.route');

const app = express();
mongoose.Promise = global.Promise;

app.use(express.static('../../client/dist/client'));

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;
/*
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'../../../client/dist/client/index.html'));
});*/
app.use('/employees', employeeRoutes);

const server = app.listen(port, function () {
    console.log('Server Lisening On Port : ' + port);
});

module.exports = { app };