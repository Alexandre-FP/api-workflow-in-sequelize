import Sequelize from "sequelize";

import config from "../config/database";

import Secretaria from "../app/models/Secretaria";
import Departamento from "../app/models/Departamento";
import Usuario from "../app/models/Usuario";
import Permissao from "../app/models/Permissao";
import Tipoprojeto from "../app/models/Tipoprojeto"
import Processolicitatorio from "../app/models/Processolicitatorio"
import Projeto from "../app/models/Projeto"
import Etapa from "../app/models/Etapa";
import Statu from "../app/models/Statu";


const models = [ Departamento, Usuario, Permissao, Tipoprojeto, Processolicitatorio, Projeto, Etapa, Statu];
const model =  [ Secretaria, Departamento, Usuario, Permissao, Tipoprojeto, Processolicitatorio, Projeto, Etapa, Statu];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
    this.associate();
  }

  init() { 
    model.forEach(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => { 
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
