import Sequelize, { Model } from "sequelize";

class Statu extends Model {
    static init (sequelize){
        super.init({
            nome: Sequelize.STRING,
            observacao: Sequelize.STRING,
            situacao: Sequelize.ENUM("ATIVO", "INATIVO", "EXCLUIDO"),
        }, { sequelize,  tableName: 'status',} 
        );
    }

    static associate(models) {
        this.hasMany(models.Etapa) 
      }
}

export default Statu;