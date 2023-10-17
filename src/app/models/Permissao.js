import Sequelize, { Model } from "sequelize";

class Permissao extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        situacao: Sequelize.ENUM("ATIVO", "INATIVO", "EXCLUIDO"),
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Usuario, { foreignKey: "permissao_id", as: "permissao" });
  }
}

export default Permissao;
