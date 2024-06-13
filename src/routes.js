import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/buildRoutePath.js';
import { extractRouteParameters } from './utils/extractRouteParameters.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const users = database.select('users');
      return response.setHeader('Content-type', 'application/json').end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: '/users',
    handler: (request, response) => {
      const { nome, email } = request.body;

      if (!nome || !email) {
        return response.writeHead(400).end('Nome e email são obrigatórios');
      }

      const user = {
        id: randomUUID(),
        nome,
        email,
      };

      database.insert('users', user);
      return response.writeHead(201).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const { id } = request.params;

      if (!id) {
        return response.writeHead(400).end('Id é obrigatório!');
      }

      const user = database.delete('users', id);

      if (user) {
        return response.writeHead(204).end();
      }

      return response.writeHead(404).end('Usuário não encontrado!');
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const { id } = request.params;
      const { nome, email } = request.body;

      if (!id) {
        return response.writeHead(400).end('Id é obrigatório!');
      }

      const updatedUser = database.update('users', id, { nome, email });

      if (updatedUser) {
        return response
          .setHeader('Content-type', 'application/json')
          .end(JSON.stringify(updatedUser));
      }

      return response.writeHead(404).end('Usuário não encontrado!');
    },
  },
];

routes.forEach((route) => {
  console.log(`Rota: ${route.method} ${route.path}`);
  const params = extractRouteParameters(route.path);
  console.log('Parâmetros:', params);
});

console.log('routes', routes);
