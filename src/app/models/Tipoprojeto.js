import Sequelize, { Model } from "sequelize";

class Tipoprojeto extends Model {
    static init (sequelize){
        super.init({
            nome: Sequelize.STRING,
            descricao: Sequelize.STRING,
            situacao: Sequelize.ENUM("ATIVO", "INATIVO", "EXCLUIDO"),
        }, 
            {
                sequelize,
                tableName: 'tipoprojetos',
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Projeto)
      }
}

export default Tipoprojeto;