import jwt from "jsonwebtoken";
import { permissoesEnum } from "../enums/index";

const AcessoRotasAdmin = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  const [, tokenEncriptado] = bearerToken.split(" ");

  const token = jwt.verify(tokenEncriptado, process.env.SECRET_PASS_JWT);
  if (token.permissao_id !== permissoesEnum.administrador) {
    return res.status(404).json({
      message: "Somente usuários administradores podem utilizar essa rota!",
    });
  } 
  return next(); 
};

export default AcessoRotasAdmin;
