import http from 'node:http';
import { routes } from './routes.js';
import { json } from './middlewares/json.js';

// request => conseguimos acessar através da requisição que está chegando em nosso servidor todos os parâmetros da requisição de quem esta chamando o nosso servidor, exemplo: Criar um usuário(name, email, senha).

// response => Devolve uma reposta para quem esta chamando nosso servidor. No caso o frontend.

// Stateful - Stateless

// Cabeçalhos (Requisição/reposta) => Metadados

// HTTP Status Code.

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  //a nossa requisição chegou aqui e foi interceptada por outro arquivo, isso é um middleware e geralmente são fáceis de identificar pois recebem a request e response.
  await json(request, response);

  const route = routes.find((route) => route.method === method && route.path === url);

  if (route) {
    route.handler(request, response);
  }

  return response.writeHead(404).end('Rota não encontrada!');
});

server.listen(3333);
