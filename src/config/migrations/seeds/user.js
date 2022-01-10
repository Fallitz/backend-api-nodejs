
exports.seed = function(knex) {
  return knex('products').del().then(function() {
    return knex('sellers').del().then(function() {
      return knex('users').del().then(function() {
        return knex('users').insert([
          {
            "id": "d0a401ba-e6e9-5104-bd5f-08012cae5d0b",
            "email": "teste@gmail.com",
            "password": "$2b$10$A3O/QHU/yDWf0rqHJMAUDOr0GNMsGQ43/3tpQKqwDjqTTNBx4D/FC",
            "fullname": "Teste Teste Teste",
            "birth": "00/00/0000",
            "nickname": "Teste",
            "gender": "Masculino",
            "type": "Comprador",
            "phone": "(79)99999-9999",
            "country": null,
            "state": null,
            "city": null,
            "district": null,
            "street": null,
            "number": null,
            "complement": null,
            "reference": null,
            "zipCode": null,
            "cpfnumber": null,
            "avatar": null,
            "recovery_code": null,
            "active": 1,
            "created_at": "2022-01-10 02:39:16",
            "updated_at": "2022-01-10 02:39:16",
            "lastAcess_at": "2022-01-10 02:39:16"
          }
        ]).then(function() {
          return knex('sellers').insert([
            {
              "id": "9703037d-8ef9-5814-b718-cc057edb8901",
              "ownerId": "d0a401ba-e6e9-5104-bd5f-08012cae5d0b",
              "name": "Teste Teste",
              "normalized": "teste teste",
              "description": "",
              "phone": "(79)99999-9999",
              "country": "BRASIL",
              "state": "SERGIPE",
              "city": "ARACAJU",
              "district": "OLARIA",
              "street": "RUA SEIS",
              "number": "03",
              "complement": "",
              "reference": "",
              "zipCode": "49092612",
              "Localization": null,
              "nationalRegister": "10100321451478",
              "socialReason": "TESTE TESTE TESTE TESTE",
              "type": "Loja",
              "category": "Loja",
              "acceptDeliver": 0,
              "acceptWithdrawal": 0,
              "avatar": "",
              "rating": null,
              "online": 0,
              "active": 1,
              "created_at": "2022-01-10 03:00:27",
              "updated_at": "2022-01-10 03:00:27"
            }
          ]);
        });
      });
    });
  });
};
