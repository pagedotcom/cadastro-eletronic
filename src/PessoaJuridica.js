// Importa a classe base Pessoa (da qual esta classe vai herdar)
const Pessoa = require("./Pessoa");
// Importa as funções de validação (dígitos para o CNPJ e texto para a razão social)
const { validarDigitos, validarTexto } = require("./validacoes");

// Pessoa jurídica: herda nome e endereço de Pessoa e acrescenta CNPJ e razão social
class PessoaJuridica extends Pessoa {
  // Campos privados (#): só podem ser acessados dentro desta classe
  #cnpj;
  #razaoSocial;

  // Construtor: roda quando criamos uma pessoa jurídica com "new"
  constructor(nome, endereco, cnpj, razaoSocial) {
    super(nome, endereco);          // chama o construtor de Pessoa (nome e endereço)
    this.cnpj = cnpj;               // passa pelo setter e valida
    this.razaoSocial = razaoSocial; // idem
  }

  // GET: devolve o CNPJ guardado
  get cnpj() { return this.#cnpj; }
  // SET: valida (precisa ter 14 dígitos) e guarda só os números
  set cnpj(valor) { this.#cnpj = validarDigitos(valor, 14, "CNPJ"); }

  // GET: devolve a razão social guardada
  get razaoSocial() { return this.#razaoSocial; }
  // SET: valida (obrigatória, ao menos 1 caractere) e guarda sem espaços nas pontas
  set razaoSocial(valor) { this.#razaoSocial = validarTexto(valor, 1, "Razão social"); }

  // Devolve a pessoa como texto, ex.: "Mega Eletro | Av. Paulista, 1000 - São Paulo/SP | CNPJ: 11222333000181 | Razão social: Mega Eletro Comércio Ltda"
  toString() {
    // super.toString() reaproveita o texto de Pessoa (nome e endereço)
    return `${super.toString()} | CNPJ: ${this.cnpj} | Razão social: ${this.razaoSocial}`;
  }
}

// Permite usar esta classe em outros arquivos com require("./PessoaJuridica")
module.exports = PessoaJuridica;
