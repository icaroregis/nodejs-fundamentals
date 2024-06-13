import http from 'node:http';
import { routes } from './routes.js';
import { json } from './middlewares/json.js';
import { buildRoutePath } from './utils/buildRoutePath.js';

// request => conseguimos acessar através da requisição que está chegando em nosso servidor todos os parâmetros da requisição de quem esta chamando o nosso servidor, exemplo: Criar um usuário(name, email, senha).

// response => Devolve uma reposta para quem esta chamando nosso servidor. No caso o frontend.

// Stateful - Stateless

// Cabeçalhos (Requisição/reposta) => Metadados

// HTTP Status Code.

//Query Parameters: BUSCA http://localhost:3333/users?userId=1 => filtros, paginação, não obrigatórios
//Route Parameters: DELETE http://localhost:3333/users/1 => identificação de recurso.
//Request Body: {nome: "Ícaro Regis", email: "icaroregisalmeida@gmail.com"} => Envio de informações de um formulário.

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  console.log('método', method);
  console.log('url', url);

  //a nossa requisição chegou aqui e foi interceptada por outro arquivo, isso é um middleware e geralmente são fáceis de identificar pois recebem a request e response.
  await json(request, response);

  const route = routes.find((route) => {
    const regex = new RegExp(`^${route.path}$`);
    return route.method === method && regex.test(url);
  });

  if (route) {
    const regexPath = buildRoutePath(route.path);
    const regex = new RegExp(`^${regexPath}$`);
    const match = url.match(regex);
    if (match) {
      request.params = match.groups;
    }
    route.handler(request, response);
  } else {
    response.writeHead(404).end('Rota não encontrada!');
  }
});

server.listen(3333);
