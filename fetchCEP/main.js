const btnPesquisar = document.getElementById("btnPesquisar");

const inputDoCep = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const complemento = document.getElementById("complemento");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const numero = document.getElementById("numero");
const cepInvalido = document.getElementById("cep-invalido");


btnPesquisar.addEventListener("click", async (event) => {
    event.preventDefault();
    const inputDoCep = document.getElementById("cep");
    const valorDoCep = inputDoCep.value;
    const url = `https://viacep.com.br/ws/${valorDoCep}/json/`;

    const resultado = await fetch(url);
    const data = await resultado.json();
    console.log(data);
    if(data.erro) {
        mostrarCepInvalido();
    } else {
        atribuirCampos(data);
    }
});


function atribuirCampos(data) {

    logradouro.value = data.logradouro;
    complemento.value = data.complemento;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    estado.value = data.uf;
    numero.value = "";

    const endereco = [logradouro, bairro, cidade, estado];
    endereco.forEach(item => {
        item.setAttribute("readonly", "_self");
        item.style.backgroundColor = "#e8f1f4";
    });

    cepInvalido.style.display = "none";
}

function mostrarCepInvalido() {

    // const cepLabel = document.getElementById("cepLabel");
    // cepLabel.innerHTML = "O CEP digitado é inválido";
    // cepLabel.classList.add("cep__invalido");
    
    cepInvalido.style.display = "block";

    inputDoCep.focus();

    const endereco = [inputDoCep, logradouro, complemento, bairro, cidade, estado, numero];
    endereco.forEach(item => {
        item.value = "";
        item.removeAttribute("readonly");
        item.style.backgroundColor = "white";
    });
}

const btnLimpar = document.getElementById("btnLimpar");
btnLimpar.addEventListener("click", function() {

    inputDoCep.focus();

    const endereco = [inputDoCep, logradouro, complemento, bairro, cidade, estado, numero];
    endereco.forEach(item => {
        item.value = "";
        item.removeAttribute("readonly");
        item.style.backgroundColor = "white";
    });

    cepInvalido.style.display = "none";
});