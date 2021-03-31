![CHICAGO](docs/black-chicago-city.png?raw=true "dark Chicago")
# api-rest-cidade-nodejs

Este projeto contem uma api REST em Node.js, onde é responsável por manipular os dados de Estado e Cidade que são obtidos através do banco de Dados MongoDB. E um client em Vue.js para a exibição de todos os dados das entidades correspondentes.

## **Modelos das entidades**

### Estado

```
nome: <string>
abreviacao: <string> <uppercase> <apenas_dois_caracteres>
```

### Cidade

```
nome: <string>
estadoId: <string> <id_da_entidade_Estado>
```

## **Funcionalidade de cada entidade**

- Inserção;
- Atualização;
- Exclusão;
- Busca:
    - Ordenação;
    - Filtro de busca por nome;
- Busca por id.

## **Rotas**

## Estado

- Inserção

```
url: /estado

method: POST

header: {
    "Content-Type": "application/json"
}

body: {
    "nome": <string>,
    "abreviacao": <string>
}
```

- Atualização

```
url: /estado

method: PUT

header: {
    "Content-Type": "application/json"
}

query: {
    id: <id_da_entidade>
}

body: {
    "nome": <string>,
    "abreviacao": <string>
}
```

- Exclusão

```
url: /estado

method: DELETE

query: {
    id: <id_da_entidade>
}
```

- Busca

```
url: /estados

method: GET

query: {
    sortBy: <campo_da_entidade>,
    orderBy: <asc, desc, 1 ou -1>
    search: <nome_do_estado>
}
```

- Busca por Id

```
url: /estado

method: GET

query: {
    id: <id_da_entidade>
}
```

## Cidade

- Inserção

```
url: /cidade

method: POST

header: {
    "Content-Type": "application/json"
}

body: {
    "nome": <string>,
    "estadoId": <string>
}
```

- Atualização

```
url: /cidade

method: PUT

header: {
    "Content-Type": "application/json"
}

query: {
    id: <id_da_entidade>
}

body: {
    "nome": <string>,
    "estadoId": <string>
}
```

- Exclusão

```
url: /cidade

method: DELETE

query: {
    id: <id_da_entidade>
}
```

- Busca

```
url: /cidades

method: GET

query: {
    sortBy: <campo_da_entidade>,
    orderBy: <asc, desc, 1 ou -1>
    search: <nome_da_cidade>
}
```

- Busca por Id

```
url: /cidade

method: GET

query: {
    id: <id_da_entidade>
}
```

## **Requisitos para execução do projeto**

Deve ter:
- ***Docker*** e ***docker-compose*** instalado na máquina.

### Para executar

- ```git clone <url_repositorio>``` : clonar o repositório;
- ```sudo docker-compose up```: rodar a aplicação

Para acessar a API diretamente é preciso acessar ```http://localhost:9090``` + o endPoint. E para acessar o Client de consulta é preciso acessar ```http://localhost:8080```

### Para executar os testes

- Alterar a variável de ambiente chamado ***NODE_ENV*** dentro do arquivo ```docker-compose.yml``` de ***development*** para ***test***;
- ```sudo docker-compose up``` para rodar a aplicação;
- ```docker ps``` para obter ***id*** do container da API REST;
- ```docker exec -it <container_id> bash``` para executar o bash e "entrar" no container da aplicação principal;
- ```yarn test``` para executar os testes.
