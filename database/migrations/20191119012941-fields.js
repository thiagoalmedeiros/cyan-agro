'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Fields', {
      id: {
				allowNull: false,
        primaryKey: true,
        autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			code: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
		});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Fields');
  }
};
