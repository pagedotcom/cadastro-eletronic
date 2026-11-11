// Importa a classe base Pessoa (da qual esta classe vai herdar)
const Pessoa = require("./Pessoa");
// Importa a função que valida números com quantidade fixa de dígitos (usada no CPF)
const { validarDigitos } = require("./validacoes");

// Pessoa física: herda nome e endereço de Pessoa e acrescenta CPF e data de nascimento
class PessoaFisica extends Pessoa {
  // Campos privados (#): só podem ser acessados dentro desta classe
  #cpf;
  #dataNascimento;

  // Construtor: roda quando criamos uma pessoa física com "new"
  constructor(nome, endereco, cpf, dataNascimento) {
    // chama o construtor de Pessoa (nome e endereço)
    super(nome, endereco);  // passa pelo setter e valida
    this.cpf = cpf; //idem
    this.dataNascimento = dataNascimento;
  }

  // GET: devolve o CPF guardado
  get cpf() { return this.#cpf; }
  // SET: valida (precisa ter 11 dígitos) e guarda só os números
  set cpf(valor) { this.#cpf = validarDigitos(valor, 11, "CPF"); }

  // GET: devolve a data de nascimento guardada
  get dataNascimento() { return this.#dataNascimento; }
  // Converte o valor (ex.: "1995-08-20") em uma data
  set dataNascimento(valor) {
    // Se a data não existe ou está no futuro, lança erro
    const data = new Date(valor);
    if (Number.isNaN(data.getTime()) || data > new Date()) {
      throw new Error("Data de nascimento inválida");
    }
    this.#dataNascimento = data;
  }
  // Devolve a pessoa como texto, ex.: "Silvana Lima | Rua Dino Bueno, 1000 - São Paulo/SP | CPF: 52998224725 | Nasc.: 1995-08-20"
  toString() {
    // Pega só os 10 primeiros caracteres: "1995-08-20" (ano-mês-dia)
    const nasc = this.dataNascimento.toISOString().slice(0, 10);
    // super.toString() reaproveita o texto de Pessoa (nome e endereço)
    return `${super.toString()} | CPF: ${this.cpf} | Nasc.: ${nasc}`;
  }
}
// Permite usar esta classe em outros arquivos com require("./PessoaFisica")
module.exports = PessoaFisica;
