module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Farms', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
      },
      code: {
          allowNull: false,
          type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      harvestId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'Harvests',
            key: 'id',
        },
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

  down: (queryInterface) => queryInterface.dropTable('Farms'),
};