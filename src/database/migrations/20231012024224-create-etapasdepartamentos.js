module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('etapasdepartamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      departamento_id: {
        type: Sequelize.INTEGER, 
        references: {
          model: 'departamentos',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      etapa_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'etapas',
          key: 'id',
          
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('etapasdepartamentos');
  },
};
