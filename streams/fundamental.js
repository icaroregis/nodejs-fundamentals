//stdin => tudo que é digitado no terminal pelo usuário.
//stdout => o retorno daquilo que foi digitado no terminal.
//Tudo que estou recebendo como entrada(stdin) estou enviando através do pipe como saída(stdout).
//process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
  //push => é o método que é utilizado em uma stream para fornecer informações para quem estiver consumindo ela.
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        //para trabalhar com streams não podemos enviar arquivos primitivos diretamente, é necessário convertê-los para um tipo de dado chamado buffer.
        //Qual informação eu desejo converter para o formato Buffer ?
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  //A stream de transformação recebe o dado transforma o mesmo e repassa para a stream de escrita. É uma stream de intermeio.
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    //o primeiro parâmetro passado na função callback é de error, aqui no nosso caso caso não fosse um número poderíamos retornar um erro, mas como não há nenhum erro passamos apenas null
    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTenStream extends Writable {
  //chunk => É o pedaço que esta sendo lido da stream de leitura(OneToHundredStream).
  //encoding => Como que a informação esta codificada.
  //callback => função que é chamada quando a stream de escrita terminou de fazer o processamento daquela informação(chunk).
  //A Stream de escrita serve apenas para processar o dado, ou seja, não transforma o dado em outro dado.
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

// new OneToHundredStream().pipe(process.stdout);
new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream());
