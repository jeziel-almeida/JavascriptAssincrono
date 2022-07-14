const botao = document.getElementById("botao-pesquisar");

botao.addEventListener("click", async () => {
    const inputUsuario = document.getElementById("usuario");
    
    try {
        const resultado = await fetch(`https://api.github.com/users/${inputUsuario.value}`);
        if(resultado.ok) {
            const resConvertido = await resultado.json();
            criarUsuario(resConvertido);
            return
        }
        throw new Error("Usuario não encontrado");

    } catch(erro) {
        console.log("Deu erro");
        usuarioNaoEncontrado();
    }
})

function criarUsuario(dados) {
    console.log(dados);
    const secao = document.querySelector(".info-usuario");
    
    const conteudo = `<div class="info-usuario__pessoal">
        <img src="${dados.avatar_url}" class="info-usuario__imagem">
        <h3>${dados.name}</h3>
        <p>${dados.bio}</p>
    </div>
    <div class="info-usuario__outros">
        <p>Endereço: ${dados.location}</p>
        <p>Seguidores: <strong>${dados.followers}</strong></p>
    </div>
    `;

    secao.innerHTML = conteudo;

}

const usuarioNaoEncontrado = () => {
    const secao = document.querySelector(".info-usuario");
    const conteudo = `<h3 class="nao-encontrado">Esse usuário não existe</h3>`
    secao.innerHTML = conteudo;   
}