// Importa a função que valida textos (usada em logradouro e cidade)
const { validarTexto } = require("./validacoes");

// Classe que representa o endereço de uma pessoa
class Endereco {
  // Campos privados (#): só podem ser acessados dentro desta classe
  #logradouro;
  #numero;
  #cidade;
  #uf;

  // Construtor: roda quando criamos um endereço com "new Endereco(...)"
  constructor(logradouro, numero, cidade, uf) {
    // Usar this.campo chama o setter, então a validação acontece aqui
    this.logradouro = logradouro;
    this.numero = numero;
    this.cidade = cidade;
    this.uf = uf;
  }

  // GET: devolve o valor do campo privado
  get logradouro() { return this.#logradouro; }
  // SET: valida (mínimo 3 letras) e só então guarda o valor
  set logradouro(valor) { this.#logradouro = validarTexto(valor, 3, "Logradouro"); }

  get numero() { return this.#numero; }
  set numero(valor) {
    // O número precisa ser inteiro e maior que zero, senão lança erro
    if (!Number.isInteger(valor) || valor <= 0) throw new Error("Número deve ser inteiro positivo");
    this.#numero = valor;
  }

  get cidade() { return this.#cidade; }
  // Cidade precisa ter ao menos 2 caracteres
  set cidade(valor) { this.#cidade = validarTexto(valor, 2, "Cidade"); }

  get uf() { return this.#uf; }
  set uf(valor) {
    if (typeof valor !== "string" || !/^[A-Za-z]{2}$/.test(valor)) throw new Error("UF deve ter 2 letras");
    // Guarda sempre em maiúsculas ("sp" vira "SP")
    this.#uf = valor.toUpperCase();
  }

  toString() {
    return `${this.#logradouro}, ${this.#numero} - ${this.#cidade}/${this.#uf}`;
  }
}

module.exports = Endereco;
