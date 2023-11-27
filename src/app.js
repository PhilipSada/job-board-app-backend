const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 4000;
const routes = require('./routes');
const db = require('./db')
require('dotenv').config()

//middleware here
app.use(express.json());
app.use(cors())



app.listen(port, "0.0.0.0", () => {
    console.log(`Application listening at http://localhost:${port}`);
    db();
    routes(app);
});