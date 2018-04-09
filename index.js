const express = require('express');
const consign = require('consign');
const cors = require('cors');
const morgan = require('morgan');

var webconfig = require('./webconfig.js');

var app = express();

app.use(morgan(':method | :status | HTTP :http-version | Resposta: :response-time ms | Data: :date[web] | URL: :url'));

app.use(cors());

consign()
    .include('controllers')
    .into(app);

app.listen( webconfig.portApi, () => {
    console.log(`Servidor Online: ${webconfig.urlApi}:${webconfig.portApi}`);
});

module.exports = app