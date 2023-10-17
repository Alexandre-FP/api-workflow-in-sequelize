'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('secretarias', { 
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
    sigla: {
      type: Sequelize.STRING,
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
  });
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('secretarias');
  }
};
