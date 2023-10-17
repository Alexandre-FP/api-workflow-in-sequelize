import Sequelize, { Model } from "sequelize";

class Departamento extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        maxdias: Sequelize.INTEGER,
        secretaria_id: Sequelize.INTEGER, //{ primaryKey: true, type: Sequelize.INTEGER }
        situacao: Sequelize.ENUM("ATIVO", "INATIVO", "EXCLUIDO"),
      },
      { 
        sequelize,
        tableName: "departamentos"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Secretaria, { foreignKey: "secretaria_id" });
    this.hasMany(models.Usuario, { foreignKey: "departamento_id", as: "departamentos" });
    this.belongsToMany(models.Etapa, {
      through: 'etapasdepartamentos',
      foreignKey: 'departamento_id',
      as: 'etapas',
    });
  }
}

export default Departamento;
