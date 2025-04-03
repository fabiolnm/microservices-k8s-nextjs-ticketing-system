import mongoose from 'mongoose'
import { app } from './app'
import { natsWrapper } from './nats-wrapper'

async function start() {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }
  try {
    await natsWrapper.connect('ticket', 'nats-srv:4222')
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!')
  })
}

start()