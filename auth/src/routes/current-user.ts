import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
  try {
    if (req.session?.jwt) {
      const currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
      res.send({ currentUser })
      return
    }
  } catch (err) {
    // ignore and return currentUser: null
  }
  res.send({ currentUser: null })
})

export { router as currentUserRouter }