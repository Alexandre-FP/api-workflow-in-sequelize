module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "workflow",
  define: {
    timestamp: true, // cria duas colunas: createdAt e updatedAt
    underscored: true,
    underscoredAll: true,
  }, 
};
