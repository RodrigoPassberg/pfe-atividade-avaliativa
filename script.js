document.addEventListener('DOMContentLoaded', () => {
    const produtos = [
        {
            "id": 1,
            "nome": "Tênis lindão",
            "descricao": "O tênis mais lindo do mundo",
            "preco": 200.00,
            "peso": 0.5,
            "frete": 0.1,
            "imagem": "https://wellifabio.github.io/produtos-cards/assets/tenis1.png"
        },
        {
            "id": 2,
            "nome": "Tênis bunitinho",
            "descricao": "O tênis mais bunitinho de hoje",
            "preco": 180.00,
            "peso": 0.5,
            "frete": 0.1,
            "imagem": "https://wellifabio.github.io/produtos-cards/assets/tenis2.png"
        },
        {
            "id": 3,
            "nome": "Bruzinha",
            "descricao": "Camiseta branca simples",
            "preco": 49.90,
            "peso": 0.3,
            "frete": 0.1,
            "imagem": "https://wellifabio.github.io/produtos-cards/assets/camiseta1.png"
        },
        {
            "id": 4,
            "nome": "Camiseta Preta",
            "descricao": "Camiseta pretinha básica",
            "preco": 59.90,
            "peso": 0.3,
            "frete": 0.1,
            "imagem": "https://wellifabio.github.io/produtos-cards/assets/camiseta2.png"
        },
        {
            "id": 5,
            "nome": "Calsa jeans masculino",
            "descricao": "Calsa jeans masculino, azul básico",
            "preco": 49.90,
            "peso": 1.2,
            "frete": 0.2,
            "imagem": "https://wellifabio.github.io/produtos-cards/assets/calsa1.png"
        },
        {
            "id": 6,
            "nome": "Calsa jeans feminino",
            "descricao": "Calsa jeans feminino, azul básico",
            "preco": 49.90,
            "peso": 0.9,
            "frete": 0.2,
            "imagem": "https://wellifabio.github.io/produtos-cards/assets/calsa2.png"
        }
    ];

    const produtosContainer = document.getElementById('produtos');
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card-produto');
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button class="detalhes-btn" data-id="${produto.id}">Detalhes</button>
            <button class="adicionar-btn" data-id="${produto.id}">Adicionar ao Carrinho</button>
        `;
        produtosContainer.appendChild(card);
    });

    const modal = document.getElementById('modal');
    const fecharModal = document.getElementById('fecharModal');
    const detalhesProduto = document.getElementById('detalhesProduto');
    const adicionarCarrinhoBtn = document.getElementById('adicionarCarrinho');
     
      produtosContainer.addEventListener('click', event => {
        const btnDetalhes = event.target.closest('.detalhes-btn');
        const btnAdicionar = event.target.closest('.adicionar-btn');
        
        if (btnDetalhes) {
            const produtoId = btnDetalhes.dataset.id;
            const produto = produtos.find(p => p.id == produtoId);
            exibirDetalhesModal(produto);
        }

        if (btnAdicionar) {
            const produtoId = btnAdicionar.dataset.id;
            const produto = produtos.find(p => p.id == produtoId);
            adicionarCarrinho(produto);
        }
    });

    function exibirDetalhesModal(produto) {
        const frete = (produto.peso * 0.1).toFixed(2).replace('.', ',');
        detalhesProduto.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p>Preço: R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <p>Peso: ${produto.peso}kg</p>
            <p>Frete: R$ ${frete}</p>
        `;
        modal.style.display = 'flex';
        adicionarCarrinhoBtn.dataset.id = produto.id;
    }

    fecharModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    function adicionarCarrinho(produto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const produtoIndex = carrinho.findIndex(p => p.id === produto.id);
        
        if (produtoIndex > -1) {
            carrinho[produtoIndex].quantidade++;
        } else {
            produto.quantidade = 1;
            carrinho.push(produto);
        }
        
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
});
document.addEventListener('DOMContentLoaded', () => {

    const carregarCarrinhoModal = () => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const produtosCarrinho = document.getElementById('produtosCarrinho');
        const totalCarrinhoModal = document.getElementById('totalCarrinhoModal');
        produtosCarrinho.innerHTML = '';

        let total = 0;

        carrinho.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto-carrinho');
            produtoDiv.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <p>${produto.nome}</p>
                <p>R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                <p>Quantidade: <input type="number" value="${produto.quantidade}" data-id="${produto.id}" class="quantidadeCarrinho"></p>
                <button class="removerProdutoCarrinho" data-id="${produto.id}"><i class="fas fa-trash-alt"></i> Remover</button>
            `;
            produtosCarrinho.appendChild(produtoDiv);
            total += produto.preco * produto.quantidade;
        });

        totalCarrinhoModal.innerHTML = `R$ ${total.toFixed(2).replace('.', ',')}`;
    };

    const modalCarrinho = document.getElementById('modalCarrinho');
    const abrirCarrinhoModal = document.getElementById('abrirCarrinhoModal');
    const fecharCarrinho = document.getElementById('fecharCarrinho');
    const fecharCarrinhoModal = document.getElementById('fecharCarrinhoModal');

    abrirCarrinhoModal.addEventListener('click', () => {
        carregarCarrinhoModal();
        modalCarrinho.style.display = 'flex';
    });

    fecharCarrinho.addEventListener('click', () => {
        modalCarrinho.style.display = 'none';
    });

    fecharCarrinhoModal.addEventListener('click', () => {
        modalCarrinho.style.display = 'none';
    });

    document.getElementById('produtosCarrinho').addEventListener('click', (e) => {
        const btnRemover = e.target.closest('.removerProdutoCarrinho');
        if (btnRemover) {
            const produtoId = btnRemover.dataset.id;
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho = carrinho.filter(produto => produto.id != produtoId);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            carregarCarrinhoModal();
        }
    });

    document.getElementById('produtosCarrinho').addEventListener('input', (e) => {
        if (e.target.classList.contains('quantidadeCarrinho')) {
            const produtoId = e.target.dataset.id;
            const novaQuantidade = e.target.value;

            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            const produtoIndex = carrinho.findIndex(p => p.id == produtoId);
            if (produtoIndex > -1) {
                carrinho[produtoIndex].quantidade = novaQuantidade;
            }
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            carregarCarrinhoModal();
        }
    });

    const enviarPedidoModal = document.getElementById('enviarPedidoModal');
    enviarPedidoModal.addEventListener('click', () => {
        localStorage.removeItem('carrinho');
        modalCarrinho.style.display = 'none';
        alert("Pedido enviado com sucesso!");
    });
});
