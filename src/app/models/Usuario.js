import Sequelize, { Model } from "sequelize";

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            senha: Sequelize.STRING,
            telefone: Sequelize.STRING,
            matricula: Sequelize.INTEGER,
            departamento_id: Sequelize.INTEGER,
            permissao_id: Sequelize.INTEGER,
            situacao: Sequelize.ENUM("ATIVO", "INATIVO", "EXCLUIDO"),
        },
            {
                sequelize,
                tableName: "usuarios"
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Permissao, { foreignKey: "permissao_id", as: "permissaoId" });
        this.belongsTo(models.Departamento, { foreignKey: "departamento_id", as: "departamentos" });
        this.hasMany(models.Projeto);
        this.hasMany(models.Processolicitatorio);
        this.belongsToMany(models.Etapa, {  through: "usuarioetapas",
        foreignKey: "usuario_id",
        as: "etapas", })
    }
}

export default Usuario;
