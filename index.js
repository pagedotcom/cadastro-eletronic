// Importa as classes que vamos testar
const Endereco = require("./src/Endereco");
const PessoaFisica = require("./src/PessoaFisica");
const PessoaJuridica = require("./src/PessoaJuridica");

// Cria um endereço que será usado em todos os testes ("sp" vira "SP" no setter)
const endereco = new Endereco("Av. Rua Dino Bueno", 1000, "São Paulo", "sp");

// Executa um cenário de teste e mostra o resultado na tela
// titulo: nome do teste | criar: função que tenta criar o cadastro
function testar(titulo, criar) {
  console.log(`\n[${titulo}]`);
  try {
    // Se der certo, mostra o cadastro criado
    console.log("OK   ->", String(criar()));
  } catch (erro) {
    // Se algum setter lançar erro, mostra a mensagem e o programa continua
    console.log("ERRO ->", erro.message);
  }
}

// Cenário 1: todos os dados corretos
testar("1. Pessoa física válida",
  () => new PessoaFisica("Silvana Lima", endereco, "529.982.247-25", "1995-08-20"));

// Cenário 2: todos os dados corretos
testar("2. Pessoa jurídica válida",
  () => new PessoaJuridica("Mega Eletro", endereco, "11.222.333/0001-81", "Mega Eletro Comércio Ltda"));

// Cenário 3: nome com apenas 2 letras (mínimo é 3)
testar("3. Pessoa física inválida (nome curto)",
  () => new PessoaFisica("Sl", endereco, "529.982.247-25", "1995-08-20"));

// Cenário 4: CNPJ com poucos dígitos (precisa ter 14)
testar("4. Pessoa jurídica inválida (CNPJ curto)",
  () => new PessoaJuridica("Mega Eletro", endereco, "123", "Mega Eletro Comércio Ltda"));

// Cenário 5: data de nascimento no futuro
testar("5. Pessoa física inválida (data futura)",
  () => new PessoaFisica("Silvana Lima", endereco, "529.982.247-25", "2005-01-01"));

// Cenário 6: razão social só com espaços (conta como vazia)
testar("6. Pessoa jurídica inválida (razão social vazia)",
  () => new PessoaJuridica("Mega Eletro", endereco, "11.222.333/0001-81", "   "));
