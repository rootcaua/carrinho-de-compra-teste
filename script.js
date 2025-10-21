
const botoesAdicionar = document.querySelectorAll(".add-carrinho");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalTexto = document.getElementById("total");

carrinho = []

botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const nome = botao.getAttribute("data-nome");
        const preco = botao.getAttribute("data-preco");
        alert("O nome é" + nome + " o valor é: " + preco);
    })
});