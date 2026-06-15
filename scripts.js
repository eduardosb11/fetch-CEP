const obterElemento = (query) => document.querySelector(query);

const form = obterElemento("form");

async function obterCEP(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}}/json/`);
    const json = await response.json();
    return json;
}