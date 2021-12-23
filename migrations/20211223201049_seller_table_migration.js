
exports.up = function(knex) {
    return knex.schema
    .createTable('sellers', function (table) {
        table.string('id', 100).notNullable();
        table.string('ownerId', 100).notNullable();
        table.string('name', 100).notNullable();
        table.mediumtext('address');
        table.string('description');
        table.string('nationalRegister', 100).notNullable();
        table.string('socialReason', 100).notNullable();
        table.string('phone', 14).notNullable();
        table.enu('type', ['store', 'service']).notNullable();
        table.mediumtext('avatar');
        table.mediumtext('category', 100).notNullable();
        table.boolean('acceptDeliver').defaultTo('false').notNullable();
        table.boolean('acceptWithdrawal').defaultTo('false').notNullable();
        table.boolean('active').defaultTo('true').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("sellers")
};
