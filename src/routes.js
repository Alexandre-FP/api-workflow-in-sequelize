import { Router } from "express";

import secretaria from "./app/controllers/SecretariaController";
import usuario from "./app/controllers/UsuarioController";
import departamento from "./app/controllers/DepartamentoController";
import permissao from "./app/controllers/PermissaoController";
import projeto from "./app/controllers/ProjetoController";
import tipoProjeto from "./app/controllers/TipoProjetoControllers";
import processolicitatorio from "./app/controllers/ProcessolicitatorioController";
import etapa from "./app/controllers/EtapaController"
import statu from "./app/controllers/StatuController";

import { AcessoRotasAdmin, AcessoRotas } from "./middlewares/index";


 
const routes = new Router(); 


routes.get("/secretaria", secretaria.index);
routes.get("/secretaria/:id", secretaria.show);
routes.post("/secretaria", secretaria.create);
routes.put("/secretaria/:id", secretaria.update);
routes.delete("/secretaria/:id", secretaria.destroy);

routes.post("/login", usuario.login);
routes.get("/usuarios", usuario.index);
routes.get("/usuarios/:id", usuario.show);
routes.post("/usuarios", usuario.create);
routes.put("/usuarios/:id", usuario.update);
routes.delete("/usuarios/:id", usuario.destroy);

routes.get("/departamento", departamento.index);
routes.get("/departamento/:id", departamento.show);
routes.post("/departamento", departamento.create);
routes.put("/departamento/:id", departamento.update);
routes.delete("/departamento/:id", departamento.destroy);

routes.get("/permissao", permissao.index);
routes.get("/permissao/:id", permissao.show);
routes.post("/permissao", permissao.create);
routes.put("/permissao/:id", permissao.update);
routes.delete("/permissao/:id", permissao.destroy);

routes.get("/projeto", projeto.listarProjeto);
routes.get("/projeto/:id", projeto.pesquisarUnicoProjeto);
routes.post("/projeto", projeto.criarProjeto);
routes.put("/projeto/:id", projeto.alterarProjeto);

routes.get("/tipoprojeto", tipoProjeto.index);
routes.get("/tipoprojeto/:id", tipoProjeto.show);
routes.post("/tipoprojeto", tipoProjeto.create);
routes.put("/tipoprojeto/:id", tipoProjeto.update);
routes.delete("/tipoprojeto/:id", tipoProjeto.destroy);

routes.get("/processo-licitatorio", processolicitatorio.listarProcessoLicitatorios);
routes.get("/processo-licitatorio/:id", processolicitatorio.pesquisarUnicoProcessoLicitatorio);
routes.post("/processo-licitatorio", processolicitatorio.criarProcessoLicitatorio);

routes.post("/etapas", etapa.criarEtapa);
routes.get("/etapas", etapa.listarEtapas);
routes.get("etapas/:id", etapa.pesquisarUnicoEtapa);
routes.get("/projeto/:projetoId", etapa.listaEtapasProjeto);
routes.get("/processo-licitatorio/:processoId", etapa.listaEtapasProcesso);

routes.post("/status", statu.criarStatus);
routes.get("/status", statu.listarStatus);
routes.get("status/:id", statu.pesquisarUnicoStatus);
export default routes; 
