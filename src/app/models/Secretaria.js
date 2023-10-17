import Sequelize, { Model } from "sequelize";

class Secretaria extends Model { 
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        sigla: Sequelize.STRING,
        situacao: Sequelize.ENUM("ATIVO", "INATIVO", "EXCLUIDO"),
      },
      {
        sequelize,
        tableName: 'secretarias', 
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Departamento);
  }
}

export default Secretaria;
