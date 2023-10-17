'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('projetos', { 
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
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    ata: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    concluido_Em: {
      type: Sequelize.DATE,
      allowNull: true,
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
    tipoprojeto_id: {
      type: Sequelize.INTEGER,
        references: { model: "tipoprojetos", key: "id" },
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
    await queryInterface.dropTable('projetos');
  }
};