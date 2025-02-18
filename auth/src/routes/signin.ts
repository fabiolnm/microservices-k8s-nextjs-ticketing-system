import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validate-request'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../services/password'
import { jwtToken } from '../services/jwt-token'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    // validation
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user) {
      const passwordMatch = await Password.compare(user.password, password)
      if (passwordMatch) {
        req.session = jwtToken(user.id, email)
        res.status(200).send(user)
        return
      }
    }

    throw new BadRequestError('Invalid credentials')
  }
)

export { router as signinRouter }