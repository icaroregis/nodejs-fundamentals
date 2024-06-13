import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);
export class Database {
  //propriedades privada.
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => this.#persist());
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    }

    const existingUser = this.#database[table].find((user) => {
      return user.email === data.email;
    });

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    this.#database[table].push(data);

    this.#persist();
    return data;
  }

  delete(table, id) {
    const index = this.#database[table].findIndex((user) => user.id === id);
    if (index !== -1) {
      this.#database[table].splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
