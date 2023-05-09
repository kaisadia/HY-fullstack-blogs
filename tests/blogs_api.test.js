const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(2)
  })



test('blog contains id', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body.map(r => r.id)
    expect(id).toBeDefined()
  })


  afterAll(async () => {
    await mongoose.connection.close()
  })