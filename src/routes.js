import { randomUUID } from 'node:crypto';
import { Database } from './database.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (response, request) => {
      const users = database.select('users');
      return response.setHeader('Content-type', 'application/json').end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: '/users',
    handler: (response, request) => {
      const { nome, email } = request.body;

      const user = {
        id: randomUUID(),
        nome,
        email,
      };

      database.insert('users', user);
      return response.writeHead(201).end();
    },
  },
];
