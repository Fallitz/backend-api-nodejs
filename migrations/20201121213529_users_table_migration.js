
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.string('id', 255).notNullable();
            table.string('email', 255).notNullable();
            table.string('password', 255).notNullable();
            table.string('fullname', 255).notNullable();
            table.string('birth').notNullable();
            table.string('nickname', 25).notNullable();
            table.enu('type', ['user', 'admin', 'seller', 'deliveryman']).defaultTo('user').notNullable();
            table.boolean('active').defaultTo('true').notNullable();
            table.string('refresh_token');
            table.string('gender').notNullable();
            table.json('address');
            table.json('avatar');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("users")
};
