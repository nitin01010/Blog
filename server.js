const express = require("express");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(require('./Routes/useRoutes'));
app.use(require('./Api_Routes/useApi'));
app.use(require("./BlogShema/BlogShema"));

app.use(require("./db/db"));



app.listen(process.env.Port, (error = 'No Error') => {
    console.log(`server is runing ${process.env.Port} and error is ${error}`.bgBlue);
});