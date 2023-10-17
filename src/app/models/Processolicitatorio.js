import Sequelize, { Model } from "sequelize";

class Processolicitatorio extends Model {
    static init (sequelize){
        super.init({
            idsonner: Sequelize.INTEGER,
            titulo: Sequelize.STRING,
            descricao: Sequelize.STRING,
            numerocompras: Sequelize.INTEGER, 
            usuario_id: Sequelize.INTEGER,
            situacao: Sequelize.ENUM("ATIVO", "INATIVO", "EXCLUIDO"),
        }, 
            {
                sequelize,
                tableName: 'processolicitatorios', 
            }
        ); 
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: "usuario_id", as: "usuarios" });
        this.hasMany(models.Projeto)
        this.hasMany(models.Etapa)
      }
}

export default Processolicitatorio;