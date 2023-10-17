import jwt from "jsonwebtoken";

const AcessoRotas = (req, res, next) => {
  const bearerToken = req.headers.authorization.split(' ')[1];

  if (!bearerToken) {
    return res.status(401).json({
      message: "Token de usuário não existe",
    });
  }
  try {
    jwt.verify(bearerToken, process.env.SECRET_PASS_JWT);
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Token não é válido",
    });
  }
};

export default AcessoRotas;
