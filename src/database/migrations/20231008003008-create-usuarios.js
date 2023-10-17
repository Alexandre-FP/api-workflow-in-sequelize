'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('usuarios', { 
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
    telefone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    matricula: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
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
    permissao_id: {
      type: Sequelize.INTEGER,
        references: { model: "permissaos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
    },
    responsavelSecretaria: {
      type: Sequelize.BOOLEAN,
      defaultValue: false 
    }
  });
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
