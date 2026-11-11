// Funções de validação reutilizadas pelos setters das classes

// Remove tudo que não for número (pontos, traços, barras, espaços e letras)
// Ex.: "529.982.247-25" vira "52998224725"
function somenteDigitos(valor) {
  return String(valor).replace(/\D/g, "");
}

// Confere se o valor tem a quantidade certa de dígitos (usada em CPF e CNPJ)
// Se estiver certo, devolve só os números; se não, lança um erro
function validarDigitos(valor, quantidade, rotulo) {
  const digitos = somenteDigitos(valor);
  if (digitos.length !== quantidade) {
    throw new Error(`${rotulo} deve ter ${quantidade} dígitos`);
  }
  return digitos;
}

// Confere se o valor é um texto com o tamanho mínimo (usada em nome, cidade etc.)
// Se estiver certo, devolve o texto sem espaços nas pontas; se não, lança um erro
function validarTexto(valor, minimo, rotulo) {
  if (typeof valor !== "string" || valor.trim().length < minimo) {
    throw new Error(`${rotulo} deve ter ao menos ${minimo} caractere(s)`);
  }
  return valor.trim();
}

// Permite usar as funções em outros arquivos com require("./validacoes")
module.exports = { validarDigitos, validarTexto };
