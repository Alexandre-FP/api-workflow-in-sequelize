import Sequelize, { Model } from "sequelize";

class Etapa extends Model {
    static init (sequelize){
        super.init({
            observacao: Sequelize.STRING, 
            usuario_id: Sequelize.INTEGER,
            processolicitatorio_id: Sequelize.INTEGER,
            projeto_id: Sequelize.INTEGER,
            statu_id: Sequelize.INTEGER,
            situacao: Sequelize.ENUM("ATIVO", "INATIVO", "EXCLUIDO"),
        }, 
            {
                sequelize,  
                tableName: "etapas"
            }
        );
    }

    static associate(models) {
        this.belongsToMany(models.Usuario, {    through: "usuarioetapas", foreignKey: "etapa_id", as: "usuarios", });
        this.belongsToMany(models.Departamento, {
            through: 'etapasdepartamentos',
            foreignKey: 'etapa_id',
            as: 'departamentos',
          });
        this.belongsTo(models.Processolicitatorio, { foreignKey: "processolicitatorio_id" })
        this.belongsTo(models.Projeto, { foreignKey: "projeto_id",  as: "projetos"})
        this.belongsTo(models.Statu, { foreignKey: "statu_id" })
      }
}

export default Etapa;