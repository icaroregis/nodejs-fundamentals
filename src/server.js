import http from 'node:http';

// request => conseguimos acessar através da requisição que está chegando em nosso servidor todos os parâmetros da requisição de quem esta chamando o nosso servidor, exemplo: Criar um usuário(name, email, senha).

// response => Devolve uma reposta para quem esta chamando nosso servidor. No caso o frontend.

// Stateful - Stateless

// Cabeçalhos (Requisição/reposta) => Metadados

// HTTP Status Code.

const users = [];

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    request.body = null;
  }

  if (method === 'GET' && url === '/users') {
    return response.setHeader('Content-type', 'application/json').end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    const { nome, email } = request.body;

    users.push({
      id: 1,
      nome,
      email,
    });

    return response.writeHead(201).end();
  }

  return response.writeHead(404).end('Rota não encontrada!');
});

server.listen(3333);
