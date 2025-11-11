const botoesAdicionar = document.querySelectorAll(".add-carrinho");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalTexto = document.getElementById("total");
const btnLimpar = document.getElementById("limpar-carrinho");
const feedback = document.getElementById("feedback");

let carrinho = [];

function mostrarFeedback(mensagem) {
    feedback.textContent = mensagem;
    feedback.classList.add("show");
    setTimeout(() => {
        feedback.classList.remove("show");
    }, 2000);
}

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function atualizaCarrinho() {
    listaCarrinho.innerHTML = "";
    
    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li class="carrinho-vazio">Seu carrinho está vazio</li>';
        totalTexto.textContent = 'Total: R$ 0,00';
        return;
    }

    let total = 0;
    
    carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        
        const itemInfo = document.createElement("div");
        itemInfo.className = "item-info";
        
        const itemNome = document.createElement("span");
        itemNome.className = "item-nome";
        itemNome.textContent = item.nome;
        
        const itemPreco = document.createElement("span");
        itemPreco.className = "item-preco";
        itemPreco.textContent = formatarMoeda(item.preco);
        
        itemInfo.appendChild(itemNome);
        itemInfo.appendChild(itemPreco);
               
        const btnRemover = document.createElement("button");
        btnRemover.className = "remove";
        btnRemover.textContent = "Remover";
        btnRemover.onclick = () => removerItem(index);
        
        li.appendChild(itemInfo);
        li.appendChild(btnRemover);
        listaCarrinho.appendChild(li);
        
        total += parseFloat(item.preco);
    });

    totalTexto.textContent = `Total: ${formatarMoeda(total)}`;
}

function removerItem(index) {
    const itemRemovido = carrinho[index];
    carrinho.splice(index, 1);
    atualizaCarrinho();
    mostrarFeedback(`${itemRemovido.nome} removido do carrinho`);
}

botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const nome = botao.getAttribute("data-nome");
        const preco = parseFloat(botao.getAttribute("data-preco"));
        
        const item = { nome, preco };
        carrinho.push(item);
        atualizaCarrinho();
        mostrarFeedback(`${nome} adicionado ao carrinho`);
    });
});

btnLimpar.addEventListener("click", () => {
    if (carrinho.length > 0) {
        carrinho = [];
        atualizaCarrinho();
        mostrarFeedback("carrinho limpo.");
    }
});


