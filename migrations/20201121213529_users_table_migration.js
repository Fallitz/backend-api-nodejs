
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.uuid('id').notNullable();
            table.string('email', 50).notNullable();
            table.string('password', 80).notNullable();
            table.string('fullname', 80).notNullable();
            table.string('birth').notNullable();
            table.string('nickname', 25).notNullable();
            table.enu('type', ['Comprador', 'Vendedor', 'Entregador']).notNullable();
            table.boolean('active').defaultTo('true').notNullable();
            table.string('refresh_token');
            table.enu('gender', ['Não informar', 'Masculino', 'Feminino', 'Outro']).notNullable();
            table.json('address');
            table.json('avatar');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('lastAcess_at').defaultTo(knex.fn.now());
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
