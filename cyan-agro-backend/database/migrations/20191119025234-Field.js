module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Fields', {
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
      point: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false,
    },
      farmId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'Farms',
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

  down: (queryInterface) => queryInterface.dropTable('Fields'),
};