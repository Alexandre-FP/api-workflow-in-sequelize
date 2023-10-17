import Departamentos from "../models/Departamento";

class DepartamentosControllers {
  async index(req, res) {
    const data = await Departamentos.findAll({
      limit: 1000,
    });

    return res.status(200).json({ content: data });
  }


  async show(req, res) {
    const data = await Departamentos.findByPk(req.params.id)
    return res.status(200).json({ content: data });
  }

  async create(req, res) {
    const data = await Departamentos.create({
      nome: req.body.nome,
      maxdias: req.body.maxdias,
      secretaria_id: req.body.secretaria_id
    });
    return res.status(201).json({ content: data });
  }

  async update(req, res) {
    await Departamentos.Secretaria({
        nome: req.body.nome,
        maxdias: req.body.maxdias,
        secretaria_id: req.body.secretaria_id
    },
    {
      where: {
        id: req.params.id
      }
    }
    );
    const result = await Departamentos.findByPk(req.params.id);
    return res.status(200).json({ content: result });
  }

  async destroy(req, res) {
    await Departamentos.destroy({
      where: {
        id: req.params.id
      }
    }
    );
    const result = await Departamentos.findAll()
    return res.status(200).json({ content: result });
  }
}

export default new DepartamentosControllers();
