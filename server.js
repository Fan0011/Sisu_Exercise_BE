import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import Server from './src/index.js'
const app = express()
const server = new Server(app)
const port = process.env.PORT ? parseInt(process.env.PORT, 10) :5000

app.listen(port, () => {
  console.info(`Server running on : ${port}`)
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('server startup error: address already in use')
  } else {
    console.log(err)
  }
})