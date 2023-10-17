import TipoProjeto from "../models/Tipoprojeto";

class TipoProjetoControllers {
  async index(req, res) {
    const data = await TipoProjeto.findAll({
      limit: 1000,
    });

    return res.status(200).json({ content: data });
  }


  async show(req, res) {
    const data = await TipoProjeto.findByPk(req.params.id)
    return res.status(200).json({ content: data });
  }

  async create(req, res) {
    const data = await TipoProjeto.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
    });
    return res.status(201).json({ content: data });
  }

  async update(req, res) {
    await TipoProjeto.Secretaria({
        nome: req.body.nome,
        descricao: req.body.descricao,
    },
    {
      where: {
        id: req.params.id
      }
    }
    );
    const result = await TipoProjeto.findByPk(req.params.id);
    return res.status(200).json({ content: result });
  }

  async destroy(req, res) {
    await TipoProjeto.destroy({
      where: {
        id: req.params.id
      }
    }
    );
    const result = await TipoProjeto.findAll()
    return res.status(200).json({ content: result });
  }
}

export default new TipoProjetoControllers();
