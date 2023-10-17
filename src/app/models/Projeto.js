import Sequelize, { Model } from "sequelize";

class Projeto extends Model {
    static init (sequelize){
        super.init({
            idsonner: Sequelize.STRING,
            titulo: Sequelize.STRING,
            descricao: Sequelize.STRING,
            valor: Sequelize.FLOAT,
            ata: Sequelize.BOOLEAN, 
            tipoprojeto_id: Sequelize.INTEGER,
            usuario_id: Sequelize.INTEGER,
            processolicitatorio_id: Sequelize.INTEGER,
            situacao: Sequelize.ENUM("ATIVO", "INATIVO", "EXCLUIDO"),
        }, 
            {
                sequelize,
                tableName: "projetos"
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: "usuario_id", as: "usuarios" });
        this.belongsTo(models.Tipoprojeto, { foreignKey: "tipoprojeto_id", as: "tipoprojetos" });
        this.belongsTo(models.Processolicitatorio, { foreignKey: "processolicitatorio_id", as: "processos" });
        this.hasMany(models.Etapa, { foreignKey: 'projeto_id' }); 
      }
      
}

export default Projeto;