
exports.up = function(knex) {
    return knex.schema
        .createTable('cart', function (table) {
            table.uuid('id').primary().defaultTo(knex.raw("(UUID())"));
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable("cart");
};
