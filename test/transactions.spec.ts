import { it, beforeAll, afterAll, describe, expect } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

//it.only
//it.todo
//it.skip

describe('Transactions route,', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  // todo teste deve obrigatoriamente se excluir de qualquer contexto, logo não deve depender de outro teste. ao criar algum teste, deve partir do princípio que outros testes não existem!!! ou seja, para testar a listagem de transações, deve se criar a transação.

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })
})
