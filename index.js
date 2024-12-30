const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const {connectDB} = require('./api/models/index');
const router = require('./api/routes/index');

const app = express();


const port = process.env.PORT|| 3000


app.listen(port,()=>{
    console.log(`connected to localhost:${port}`);
    connectDB();
});




app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'))

app.use(router);
