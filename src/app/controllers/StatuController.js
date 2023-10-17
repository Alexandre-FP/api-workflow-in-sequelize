import Statu from "../models/Statu";

class StatuContoller { 
  async criarStatus(req, res) {
    const { body } = req;

    const result = await Statu.create({ 
      ...body 
    });
    return res.status(200).json({ content: result }); 
  }

  async listarStatus(req, res) {
    const result = await Statu.findAll({
      orderBy: {
        created_at: "asc",
      },
    });
    return res.status(200).json({ content: result });
  }

  async pesquisarUnicoStatus(req, res) {
    const { params } = req;
    const result = await Statu.findOne({
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

export default new StatuContoller();
