'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('etapas', { 
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    observacao: {
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
    departamento_id: {
      type: Sequelize.INTEGER,
        references: { model: "departamentos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
    },
    usuario_id: {
      type: Sequelize.INTEGER,
        references: { model: "usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
    },
    statu_id: {
      type: Sequelize.INTEGER,
        references: { model: "status", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
    },
    projeto_id: {
      type: Sequelize.INTEGER,
        references: { model: "projetos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: true,
    },
    processolicitatorio_id: {
      type: Sequelize.INTEGER,
        references: { model: "processolicitatorios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: true, 
    },
  })
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('etapas'); 
  }
};