//buffer => buffer é uma representação de um espaço na memória do computador, usado especificamente para transitar dados de uma maneira muito rápida. Ou seja, os dados armazenados no buffer, eles são armazenados ali para logo eles serem tratados, ou seja, enviados para algum outro lugar, e depois logo removidos.

//representação de dados na memória
const buffer = Buffer.from('hello');
console.log(buffer.toJSON());
