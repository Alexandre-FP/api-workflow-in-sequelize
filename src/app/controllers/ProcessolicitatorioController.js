import Processolicitatorio from "../models/Processolicitatorio";
import Etapa from "../models/Etapa";
import Projeto from "../models/Projeto"; 
import jwt from "jsonwebtoken";
import _ from "lodash";
import { departamentoEnum } from "../../enums/index" 

class ProcessolicitatorioController {
  async criarProcessoLicitatorio(req, res, next) {
    const { body, headers } = req;
    const [, tokenEncriptado] = headers.authorization.split(" ");
    const token = jwt.verify(tokenEncriptado, process.env.SECRET_PASS_JWT);

if (!body.projeto_id) {
  return res.status(409).json({ 
    message: "ProjetosId é obrigatório ser enviado",
  }); 
} 

try {
  if (token.departamento_id !== departamentoEnum.compras) {
    return res.status(200).json({ mensage: "Somente o departamento de compras pode criar novos processos licitações." });
  }
} catch (error) {
  error.statusCode = 409;
  return next(error);
}

const processoGerado = await Processolicitatorio.create({
  ..._.omit(body, "projeto_id"), usuario_id: token.id ,  
});

    await Projeto.update(  
      { processolicitatorio_id: processoGerado.id }, 
      { where:  { id: req.body.projeto_id } } 
      ); 



await Etapa.create({
  observacao: "Processo licitatório aberto",
  usuario_id: token.id,
  departamento_id: token.departamento_id,
  statu_id: 1,
  processolicitatorio_id: processoGerado.id, 
});



const result = await Processolicitatorio.findOne({
  where: {
    id: processoGerado.id,
  },
  include: [
    {
      model: Etapa, 
    },
    {
      model: Projeto, 
    },
  ],
});

  return res.status(200).json({ content: result });
}

  async listarProcessoLicitatorios(req, res) { 
    const result = await Processolicitatorio.findAll({
      include: [
        {
          model: Projeto, 
        },
      ],
    });
    return res.status(200).json({ content: result });
  }

  async pesquisarUnicoProcessoLicitatorio(req, res) {
    const { params } = req;
    const result = await Processolicitatorio.findOne({
      where: {
        id: Number(params.id),
      },
      include: [
        {
          model: Projeto,
        },
        {
          model: Etapa,
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



export default new ProcessolicitatorioController;