import express from 'express'
import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { errorHandler, NotFoundError } from '@miranti/ticketing-common'

const app = express()
app.set('trust proxy', true) // trust ingress-nginx proxy
app.use(cookieSession(
  { signed: false, secure: process.env.NODE_ENV !== 'test' }
))

app.use(json())

app.all('*', () => { throw new NotFoundError() })

app.use(errorHandler)

export { app }