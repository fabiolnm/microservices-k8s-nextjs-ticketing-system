import request from 'supertest'
import { app } from '../../app'

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  const response = await request(app)
    .get('/api/users/signout')
    .send({})
    .expect(302)

  const [cookie] = response.get('Set-Cookie') || []
  if (!cookie) {
    throw new Error('Cookie not found')
  }
  expect(cookie).toBe(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  )
})