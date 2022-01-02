
exports.up = function(knex) {
    return knex.schema
    .createTable('sellers', function (table) {
        table.uuid('id').notNullable();
        table.uuid('ownerId').notNullable();
        table.string('name', 100).notNullable();
        table.string('description');
        table.string('phone', 14).notNullable();
        table.string('country', 10).notNullable();
        table.string('state', 25).notNullable();
        table.string('city', 50).notNullable();
        table.string('district', 50).notNullable();
        table.string('street', 50).notNullable();
        table.string('number', 10).notNullable();
        table.string('complement', 50);
        table.string('reference', 50);
        table.string('zipCode', 10).notNullable();
        table.string('nationalRegister', 14).notNullable();
        table.string('socialReason', 100).notNullable();
        table.enu('type', ['Loja', 'Restaurante', 'Serviço']).notNullable();
        table.string('category', 100).notNullable();
        table.boolean('acceptDeliver').defaultTo('false').notNullable();
        table.boolean('acceptWithdrawal').defaultTo('false').notNullable();
        table.mediumtext('avatar').notNullable();
        table.string('rating', 5);
        table.boolean('online').defaultTo('false').notNullable();
        table.boolean('active').defaultTo('true').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("sellers");
};
