const Bcrypt = require('../../utils/bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Admin',
      email: 'admin',
      password: await Bcrypt.hash('123'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
