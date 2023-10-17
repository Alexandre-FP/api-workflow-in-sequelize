# WorkFlow REST API

Api de consumo do WorkFlow App.

### Regras de negócio

- **Geral**
- [x] Não é possível fazer requisições as rotas da api exceto para rota de /login sem que tenha um token de autenticação.
- [x] Não é possível criar usuários com o mesmo e-mail ou matrícula.
- [x] Não é possível definir vários usuários responsaveis por uma mesma secretária. Para associar um novo usuário como responsavel da secretaria, primeiro desvincule o usuário corrente dessa mesma secretaria.
- [x] Somente usuários com permissão (1)Administrador pode fazer cadastros de Usuários, Departamentos, Secretárias, Permissões, Tipos Projeto e Status.
- **Usuários**
- [x] Quando alterar ou criar um usuário que for responsavelSecretaria = true, não deixar e avisar o usuário para primeiro divicular aquele usuário da responsabilidade de tal secretária.
- **Etapas**
- [x] Não pode excluir etapas de qualquer forma.
- **Projetos**
- [x] Listagem de projetos para usuários com permissão (1)Administrador = VER TUDO | (2)Compras = VER PROJETOS DO DEP. COMPRAS | (3)Secretario = VER PROJETOS DA SEC. TODA | (4)Usuario = VER APENAS PROJETO QUE ELE CRIOU.
- [x] Não é possível editar um projeto criado por outro usuarioId que não seja o do usuário corrente/logado.
- [x] Não é possível editar um projeto que esteja concluído.
- [x] Não é possível criar um projeto ATA sendo parte de um processo licitatório e vice-versa.
- [x] Não é possível cadastrar um projeto sendo ATA com tipo de projeto diferente de situação ATA.
