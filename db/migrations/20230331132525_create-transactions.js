"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary();
        table.text('title').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        //timestamp => anota a data que cada registro foi criado
        //notNullable => não pode ficar vazio
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('transactions');
}
exports.down = down;
//up => o que a migration vai fazer no banco de dados
//down => desfazer alterações da migration
