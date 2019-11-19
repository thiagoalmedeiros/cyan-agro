module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Mills', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
      },
      name: {
          allowNull: false,
          type: Sequelize.STRING,
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
      },
      updatedAt: {
          type: Sequelize.DATE,
      },
      deletedAt: {
          type: Sequelize.DATE,
      },
  }),

  down: (queryInterface) => queryInterface.dropTable('Mills'),
};