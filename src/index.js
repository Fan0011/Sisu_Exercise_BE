import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import Routes from './routes/index.js'
import bodyParser from 'body-parser'
import { urlencoded } from 'express'
import cors from 'cors'
export default class Server {
  
  constructor(app) {
    this.config(app)
    this.connect()
    new Routes(app)
  }

  connect(){
    console.log('ENV', process.env.DB_CONFIG)
    mongoose.connect(process.env.DB_CONFIG)    
        .then(() => console.log('Connected to Database'))
        .catch(err => {
         throw new Error(err)
        })
    mongoose.set('debug', true)
  } 

  config(app) {   
    app.use(urlencoded({ extended: true }));
    app.use(cors());
    app.use(bodyParser());
  }
}

process.on('beforeExit', function (err) {
  console.error(err)
})