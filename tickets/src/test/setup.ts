import jwt from 'jsonwebtoken'

import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

jest.mock('../nats-wrapper')

let mongo: any;

declare global {
  var signin: () => string[]
}

beforeAll(async () => {
  process.env.JWT_KEY = 'test-jwt-key';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = (await mongoose.connection.db?.collections()) || [];

  for (let collection of collections) {
    await collection.deleteMany({});
  }
})

afterAll(async () => {
  await mongo?.stop()
  await mongoose.connection.close()
})

global.signin = () => [
  `session=${Buffer.from(
    JSON.stringify({
      jwt: jwt.sign({
        email: 'test@example.com',
        id: new mongoose.Types.ObjectId().toHexString()
      }, process.env.JWT_KEY!)
    })
  ).toString('base64')}`
]