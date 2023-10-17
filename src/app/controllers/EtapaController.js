import Etapa from "../models/Etapa";

class EtapaContoller {
  async criarEtapa(req, res) {
    const { body, headers } = req;
    const [, tokenEncriptado] = headers.authorization.split(" ");
    const token = jwt.verify(tokenEncriptado, process.env.SECRET_PASS_JWT);

    const result = await Etapa.create({
      data: { ...body, 
         usuario_id: token.id 
      },
    });
    return res.status(200).json({ content: result });
  }

  async listarEtapas(req, res) {
    const result = await Etapa.findAll({
      orderBy: {
        criadoEm: "asc",
      },
    });

    return res.status(200).json({ content: result });
  }

  async listaEtapasProjeto(req, res) {
    const { params } = req;
    const result = await Etapa.findAll({
      where: {
        projetoId: Number(params.projeto_id),
      },
    });

    return res.status(200).json({ content: result });
  }

  async listaEtapasProcesso(req, res) {
    const { params } = req;
    const result = await Etapa.findMany({
      where: {
        processoLicitatorio_id: Number(params.processoLicitatorio_id), 
      },
    });

    return res.status(200).json({ content: result });
  }
  
  async pesquisarUnicoEtapa(req, res) {
    const { params } = req;
    const result = await Etapa.findOne({
      where: {
        id: Number(params.id),
      },
    });

    if (!result) {
      return res.status(404).json({
        message: "Registro não encontrado",
      });
    }

    return res.status(200).json({ content: result });
  } 

}

export default new EtapaContoller();
