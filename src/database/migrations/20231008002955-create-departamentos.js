'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('departamentos', { 
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    maxdias: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    situacao: {
      type: Sequelize.ENUM("ATIVO", "INATIVO", "EXCLUIDO"), 
      allowNull: false,
      defaultValue: "ATIVO",
    },
    secretaria_id: { 
      type: Sequelize.INTEGER,
        references: { model: "secretarias", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false, 
    }
  });
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('departamentos');
  }
};
