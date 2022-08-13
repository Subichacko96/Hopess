require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyparser = require('body-parser');
const authRoute = require('./routes/auth.routes');
const newsRoute = require('./routes/news.routes');
const adsRoute=require('./routes/ads.routes')
const webRoute=require('./routes/web.routes')

//express init
const app = express();
//PORT
const port = process.env.PORT || 3000;

//DB Connection
const db = mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
db.then(() => {
  console.log('connection Success!!');
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname+'/public'));
app.use(bodyparser.json());
app.use(express.static('uploads'));
app.use('/auth', authRoute);
app.use('/news', newsRoute);
app.use('/ads', adsRoute);
app.use('/web', webRoute);


app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
