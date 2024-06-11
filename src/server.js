import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './middlewares/database.js';

// request => conseguimos acessar através da requisição que está chegando em nosso servidor todos os parâmetros da requisição de quem esta chamando o nosso servidor, exemplo: Criar um usuário(name, email, senha).

// response => Devolve uma reposta para quem esta chamando nosso servidor. No caso o frontend.

// Stateful - Stateless

// Cabeçalhos (Requisição/reposta) => Metadados

// HTTP Status Code.

const database = new Database();

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  //a nossa requisição chegou aqui e foi interceptada por outro arquivo, isso é um middleware e geralmente são fáceis de identificar pois recebem a request e response.
  await json(request, response);

  if (method === 'GET' && url === '/users') {
    const users = database.select('users');
    return response.setHeader('Content-type', 'application/json').end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    const { nome, email } = request.body;

    const user = {
      id: 1,
      nome,
      email,
    };

    database.insert('users', user);
    return response.writeHead(201).end();
  }

  return response.writeHead(404).end('Rota não encontrada!');
});

server.listen(3333);
