import Projeto from "../models/Projeto";
import Etapa from "../models/Etapa";
import Tipoprojeto from "../models/Tipoprojeto"
import Departamento from "../models/Departamento"
import jwt from "jsonwebtoken";
import _ from "lodash";
import { permissoesEnum } from "../../enums/index" 
import { Op } from "sequelize";

class ProjetoControllers {
  async criarProjeto(req, res, next) {
    const { body, headers } = req;
    const [, tokenEncriptado] = headers.authorization.split(" ");
    const token = jwt.verify(tokenEncriptado, process.env.SECRET_PASS_JWT);  

    try {
      if ((body.ata === true && body.tipoprojeto_id !== 2) || (body.ata === false && body.tipoprojeto_id === 2)) {
        return res.status(200).json({ 
          mensage: "Projeto não pode ser ATA com o tipo de projeto diferente de Situação ATA."
         });
      }
    } catch (error) { 
      error.statusCode = 409;
      return next(error);
    }

    const projetoGerado = await Projeto.create({ 
       ...body, usuario_id: token.id ,
    });


    // await Etapa.create({
    //     observacao: "Projeto aberto",
    //     usuario_id: token.id,
    //     departamento_id: token.departamento_id,
    //     statu_id: 1,
    //     projeto_id: projetoGerado.id,
    // }); 

    const result = await Projeto.findOne({
      where: {
        id: projetoGerado.id,
      }, 
      include: [
        {
          model: Etapa, 
        },
      ],
    });
    return res.status(200).json({ content: result });
  }


  async listarProjeto(req, res){
    const { headers } = req;
    const [, tokenEncriptado] = headers.authorization.split(" ");
    const token = jwt.verify(tokenEncriptado, process.env.SECRET_PASS_JWT); 

    let result = null;
    switch (token.permissao_id) {
      case permissoesEnum.administrador: { 
        result = await Projeto.findAll({
          include: [
            {
              model: Etapa,  
              include: [
                {
                  model: Departamento, 
                  attributes: ['nome'], 
                  as: 'departamentos', 
                },
              ],
            },
            
            {
              association: "tipoprojetos",
              attributes: ["id", "nome"]
            },
            
          ],
          
        });
        break;
      }
      case permissoesEnum.compras: {
        result = await Projeto.findAll({
          include: [
            {
              association: "tipoprojetos",
              attributes: ["id", "nome"]
            },
            { 
              model: Etapa, 
              where: {
                departamento_id: token.departamento_id,
              },
              include: [
                {
                  model: Departamento, 
                  attributes: ['nome'],  
                  as: 'departamentos',  
                }, 
              ],
            },
          ],
        });
        // result = result.forEach((projeto) => {
        //   if (projeto.Etapas && projeto.Etapas.length > 1) {
        //     projeto.Etapas.reverse();
        //   }
        //   return projeto;
        // });
      
        // result = result.filter((projeto) => {
        //   const etapas = projeto.Etapas;
        //   if (etapas && etapas.length > 0) {
        //     const ultimaEtapa = etapas[etapas.length - 1];
        //     return ultimaEtapa.departamentos.nome === 'Compras';
        //   }
        //   return false; 
        // }); 
        break;
      }
      // case permissoesEnum.secretario: {
      //   const secretariaUsuario = await prisma.usuario.findFirst({
      //    where: {
      //     id: token.id
      //    },
      //   });
      //   break;
      // }
      case permissoesEnum.usuario: {
        result = await Projeto.findAll({
          include: [
            {
              model: Etapa,
              where: {
               usuario_id: token.id, 
              },
              as: 'Etapas',
            },
            {
              model: Tipoprojeto,
              attributes: [ "id", "nome"]
            }
          ]
        });
        break;
      }
      default: {
        result = [];
      }
    }

    return res.status(200).json({ content: result });

  }

  async alterarProjeto(req, res, next) {
    const { body, headers, params } = req;
    const [, tokenEncriptado] = headers.authorization.split(" ");

    const token = jwt.verify(tokenEncriptado, process.env.SECRET_PASS_JWT);

    try {
      if (!params.id) {
        throw new Error("Projeto não encontrado.");
      }
    } catch (error) {
      error.statusCode = 409;
      return next(error);
    }

    try {
      if (body.processolicitatorio_id && body.ata === true) {
        return res.status(409).json({
          mensage: "Projeto não pode ser vínculado a um processo licitatório e ser ATA."
        })
      }
    } catch (error) {
      error.statusCode = 409;
      return next(error);
    }

    const projetoCriadoAntes = await Projeto.findOne({
      where: {
        id: Number(params.id),
      },
    });

    try {
      if (!projetoCriadoAntes) {
        throw new Error("Projeto não encontrado."); 
      }
    } catch (error) {
      error.statusCode = 409;
      return next(error);
    }

    try {
      if (projetoCriadoAntes.usuario_id !== token.id) {
        return res.status(409).json({
          mensage: "Projeto não pode ser editado por um usuário diferente."
        })
      }
    } catch (error) {
      error.statusCode = 409;
      return next(error);
    }

    try {
      if (projetoCriadoAntes.processolicitatorio_id && body.ata === true) {
        return res.status(409).json({
          mensage: "Projeto vínculado a um processo licitatório, não pode virar ATA."
        })
      }
    } catch (error) {
      error.statusCode = 409;
      return next(error);
    }

     await Projeto.update({
      ...body
    },
    {
      where: {
        id: req.params.id
      }
    }
    );
    const result = await Projeto.findByPk(req.params.id);
    return res.status(200).json({ content: result }); 
  }


  async index(req, res){
    const result = await Projeto.findAll({
      limit: 1000
    })
    return res.status(200).json({ content: result });
  }


  async pesquisarUnicoProjeto(req, res) {
    const { params } = req;
    const result = await Projeto.findOne({
      where: {
        id: Number(params.id),
      },
      include: [
        {
          model: Etapa, 
          include: [
            {
              model: Departamento, 
              attributes: ['nome'], 
              as: 'departamentos', 
            },
          ],
        },
      ],
    });

    if (!result) {
      return res.status(404).json({
        message: "Registro não encontrado",
      });
    }

    return res.status(200).json({ content: result });
  }

}



export default new ProjetoControllers;