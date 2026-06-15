const obterElemento = (query) => document.querySelector(query);

carregarDados();
window.addEventListener("beforeunload", salvarDados);

const form = obterElemento("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
});

const cepInput = obterElemento("#cep");
cepInput.addEventListener("blur", async (event) => {
    const cep = event.target.value;
    if (cep.length != 8) {
        return;
    }
    console.log(cep);
    const endereco = await obterCEP(cep);
    preencherEndereço(endereco);
});

function salvarDados() {
    localStorage.setItem("nome", obterElemento("#nome").value);
    localStorage.setItem("cpf", obterElemento("#cpf").value);
    localStorage.setItem("cep", obterElemento("#cep").value);
    localStorage.setItem("bairro", obterElemento("#bairro").value);
    localStorage.setItem("localidade", obterElemento("#localidade").value);
    localStorage.setItem("estado", obterElemento("#estado").value);
};

function carregarDados() {
    obterElemento("#nome").value = localStorage.getItem("nome");
    obterElemento("#cpf").value = localStorage.getItem("cpf");
    obterElemento("#cep").value = localStorage.getItem("cep");
    obterElemento("#bairro").value = localStorage.getItem("bairro");
    obterElemento("#localidade").value = localStorage.getItem("localidade");
    obterElemento("#estado").value = localStorage.getItem("estado");
}

async function obterCEP(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const json = await response.json();
    return json;
}

function preencherEndereço(endereco) {
    obterElemento("#bairro").value = endereco.bairro;
    obterElemento("#localidade").value = endereco.localidade;
    obterElemento("#estado").value = endereco.estado;
}