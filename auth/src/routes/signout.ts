import express from 'express'

const router = express.Router()

router.get('/api/users/signout', (req, res) => {
  req.session = null
  res.redirect('/')
})

export { router as signoutRouter }