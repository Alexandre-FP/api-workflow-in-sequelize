import bcrypt from "bcryptjs"
import Usuarios from "../models/Usuario";
import jwt from "jsonwebtoken";
import _ from "lodash"; 
import { Op } from "sequelize"; 
import 'dotenv/config'

class UsuarioContollers {
  async login(req, res, next) {
    const { body } = req;

    const usuarioExiste = await Usuarios.findOne({
        where: {
          email: body.email, 
        }, 
        include: [
          {
            association: "permissao",
            attributes: ["nome"],
            as: "permissao"
          },
          {
            association: "departamentos",
            attributes: ["nome"], 
            as: "departamentos"
          },
        ],
      });
  
      try {
        if (!usuarioExiste) {
          return res.status(401).json({
            mensage: "Não existe usuário cadastro com esses dados"
          })
        }
      } catch (error) {
        error.statusCode = 404; 
        return next(error);
      }
    
    const senhaCoincidem = await bcrypt.compare(body.senha, usuarioExiste.senha); 
  
    try {
      if (!senhaCoincidem) {
            return res.status(401).json({
            mensage: "Email ou senha incorretos"
          });;
      } 
    } catch (error) {
      error.statusCode = 404;
      return next(error);
    } 
  
    const play = {
      id: usuarioExiste.id,
      nome: usuarioExiste.nome,
      email: usuarioExiste.email,
      departamento: usuarioExiste.departamentos.nome,
      permissao: usuarioExiste.permissao.nome,
      createdAt: usuarioExiste.createdAt,
      updatedAt: usuarioExiste.updatedAt,
      permissao_id: usuarioExiste.permissao_id,
      departamento_id: usuarioExiste.departamento_id
    }

    const token = jwt.sign({ ..._.omit(play, "senha") }, process.env.SECRET_PASS_JWT, { 
      subject: String(usuarioExiste.id), 
      expiresIn: 60 * 60 * 3,  
    }); 
  
    return res.status(200).json({ content: { token, session:_.omit(play, "senha") } });
  }
  
  async logout(req, res) {
    return res.status(200).json(true);
  }

  async index(req, res) {
      const data = await Usuarios.findAll({
        attributes: [ "id", "nome", "email", "telefone", "matricula", "updatedAt", "departamento_id", "responsavelSecretaria" ],
        include: [
          {
            association: "permissao",
            attributes: ["nome"],
            as: "permissao"
          },
          {
            association: "departamentos",
            attributes: ["nome"], 
            as: "departamentos"
          },
        ],
     });

    return res.status(200).json({ content: data });
  }

  async show(req, res) {
    const data = await Usuarios.findByPk(req.params.id)
    return res.status(200).json({ content: data });
  }

  async create(req, res) {
    const { body } = req
    const usarioJaExiste = await Usuarios.findOne({
      where: {
        email: body.email, 
      },
    });
   
    try {
      if (usarioJaExiste) {
        throw new Error("Já existe usuário com esse e-mail");
      }
    } catch (error) {
      error.statusCode = 409;
      return next(error);
    }

    try {
      const existeUsuarioJaResponsavelSecretaria = Usuarios.findOne({
        where: {
          departamento_id: body.departamento_id,
          [Op.and]: {
            responsavelSecretaria: true,
          }
        }
      });
      if (body.responsavelSecretaria === true && existeUsuarioJaResponsavelSecretaria) {
        throw new Error("Já existe um usuário responsável pela secretária desse departamento");
      }
    } catch (error) {
      error.statusCode = 409;
      return next(error);
    }
    const senhaEncriptada = await bcrypt.hash(body.senha, 8);

    const result = await Usuarios.create({
        ...body,
        senha: senhaEncriptada,
        include: [
        {
          association: "departamentos",
          attributes: ["nome"], 
          as: "departamentos"
        },
      ]
    });
    return res.status(200).json({ content: result });
}

  async update(req, res) {
    const { body } = req
    await Usuarios.update({
      body
    },
    {
      where: {
        id: req.params.id
      }
    }
    );
    const result = await Usuarios.findByPk(req.params.id);
    return res.status(200).json({ content: result });
  }

  async destroy(req, res) {
    await Usuarios.destroy({
      where: {
        id: req.params.id
      }
    }
    );
    const result = await Usuarios.findAll()
    return res.status(200).json({ content: result });
  }
}



export default new UsuarioContollers;