import { config } from './config';
import express from 'express';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import routes from './routes';
import bodyParser from 'body-parser';
const app = express();
var router = express.Router({ strict: true });
app.use(bodyParser.json())
mongoose.connect(config.dbConnectStatement, {useNewUrlParser: true}, ( err, client ) => {
  if (err) {
    console.log(err);
  } else {
    console.log("CONNECTION ESTABLISHED TO MONGO DB ");
  }
})
routes(app);
app.listen(config.port || process.env.PORT, () => {
  console.log("RUNNING ON PORT",config.port);
})
