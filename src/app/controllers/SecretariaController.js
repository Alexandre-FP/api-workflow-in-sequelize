import Secretaria from "../models/Secretaria";

class SecretariasController {
  // Listagem dos Customers
  async index(req, res) {
    const data = await Secretaria.findAll({
      limit: 1000,
    }); 

    return res.status(200).json({ content: data });
  }

  // Recupera um Customer
  async show(req, res) {
    const data = await Secretaria.findByPk(req.params.id)
    return res.status(200).json({ content: data });
  }

  // Cria um novo Customer
  async create(req, res) {
    const data = await Secretaria.create({
      nome: req.body.nome,
      sigla: req.body.sigla,
    });
    return res.status(201).json({ content: data });
  }


  async update(req, res) {
    await Secretaria.update({
      nome: req.body.nome,
      sigla: req.body.sigla,
    },
    {
      where: {
        id: req.params.id
      }
    }
    );
    const result = await Secretaria.findByPk(req.params.id);
    return res.status(200).json({ content: result });
  }


  async destroy(req, res) {
    await Secretaria.destroy({
      where: {
        id: req.params.id
      }
    }
    );
    const result = await Secretaria.findAll()
    return res.status(200).json({ content: result });
  }
}

export default new SecretariasController();
