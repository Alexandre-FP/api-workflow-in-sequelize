import Permissao from "../models/Permissao";

class PermissaoControllers {
  async index(req, res) {
    const data = await Permissao.findAll({
      limit: 1000, 
    });

    return res.status(200).json({ content: data });
  }


  async show(req, res) {
    const data = await Permissao.findByPk(req.params.id)
    return res.status(200).json({ content: data });
  }

  async create(req, res) {
    const data = await Permissao.create({
      nome: req.body.nome,
      descricao: req.body.descricao,
    });
    return res.status(201).json({ content: data });
  }

  async update(req, res) {
    await Permissao.Secretaria({
        nome: req.body.nome,
        descricao: req.body.descricao,
    },
    {
      where: {
        id: req.params.id
      }
    }
    );
    const result = await Permissao.findByPk(req.params.id);
    return res.status(200).json({ content: result });
  }

  async destroy(req, res) {
    await Permissao.destroy({
      where: {
        id: req.params.id
      }
    }
    );
    const result = await Permissao.findAll()
    return res.status(200).json({ content: result });
  }
}

export default new PermissaoControllers();
