
exports.up = function(knex) {
    return knex.schema
    .createTable('products', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw("(UUID())"));
        table.uuid('sellerId').references('id').inTable('sellers').notNullable().defaultTo(knex.raw("(UUID())"));
        table.string('name', 100).notNullable();
        table.string('description', 500).notNullable();
        table.string('category', 100).notNullable();
        table.string('subcategory', 100).notNullable();
        table.string('pryce', 20).notNullable();
        table.string('pryceAPrazo', 20).notNullable();
        table.string('pryceAVista', 20).notNullable();
        table.mediumtext('avatar').notNullable();
        table.float('rating');
        table.boolean('active').defaultTo('true').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  
};
