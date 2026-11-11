// Importa a classe Endereco (usada para conferir o tipo do endereço)
const Endereco = require("./Endereco");
// Importa a função que valida textos (usada no nome)
const { validarTexto } = require("./validacoes");

// Classe principal: guarda o que é comum a pessoa física e jurídica
class Pessoa {
  // Campos privados (#): só podem ser acessados dentro desta classe
  #nome;
  #endereco;

  // Construtor: roda quando criamos uma pessoa com "new"
  constructor(nome, endereco) {
    this.nome = nome;         // passa pelo setter e valida
    this.endereco = endereco; // idem
  }

  // GET: devolve o nome guardado
  get nome() { return this.#nome; }
  // SET: valida (mínimo 3 caracteres) e só então guarda o nome
  set nome(valor) { this.#nome = validarTexto(valor, 3, "Nome"); }

  // GET: devolve o endereço guardado
  get endereco() { return this.#endereco; }
  set endereco(valor) {
    // Só aceita um objeto criado com a classe Endereco; senão lança erro
    if (!(valor instanceof Endereco)) throw new Error("Endereço é obrigatório");
    this.#endereco = valor;
  }
  // Devolve a pessoa como texto, ex.: "Silvana Lima| Rua Dino Bueno, 1000 - São Paulo/SP"
  toString() { return `${this.nome} | ${this.endereco}`; }
}
// Permite usar esta classe em outros arquivos com require("./Pessoa")
module.exports = Pessoa;
