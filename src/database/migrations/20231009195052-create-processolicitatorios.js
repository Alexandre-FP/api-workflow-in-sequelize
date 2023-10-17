'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('processolicitatorios', { 
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idsonner: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    numerocompras: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricao: {
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
    usuario_id: {
      type: Sequelize.INTEGER,
        references: { model: "usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false, 
    },
  })
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('processolicitatorios');
  }
};