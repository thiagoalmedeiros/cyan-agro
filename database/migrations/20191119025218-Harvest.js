module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Harvests', {
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
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      millId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'Mills',
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

  down: (queryInterface) => queryInterface.dropTable('Harvests'),
};