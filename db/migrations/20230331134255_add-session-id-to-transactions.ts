import { table } from 'console'
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.uuid('session_id').after('id').index()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id')
  })
}

//alterTable => alterar algo na tabela
//after => posicionar coluna depois de outra
//index => cria automaticamente um índice no campo. índice é uma forma de falar pro banco de dados que irão ser feitas, por exemplo, muitas buscas em transações específicas de uma id de uma sessão, ou seja, o session_id será muito utilizado dentro do where
