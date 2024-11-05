// Obter o ID do produto que queremos buscar
var id = parseInt(localStorage.getItem('detalhe'));

// Obter a lista de produtos do localStorage
var produtos = JSON.parse(localStorage.getItem('produtos'));

// Log para verificar o conteúdo de produtos
console.log(produtos);

if (produtos) {
    var item = produtos.find(produto => produto.id === id);

    if (item) {
        console.log('Produto encontrado: ', item);

        // Log para verificar o caminho da imagem
        console.log('Caminho da imagem:', item.imagem);

        // Alimentar com os valores do item
        $("#imagem-detalhe").attr('src', item.imagem);
        $("#nome-detalhe").html(item.nome);
        $("#rating-detalhe").html(item.rating);
        $("#like-detalhe").html(item.likes);
        $("#reviews-detalhe").html(item.reviews + ' reviews ');
        $("#descricao-detalhe").html(item.descricao);
        $("#preco-detalhe").html(item.preco);
        $("#precopromo-detalhe").html(item.preco_promocional);

        // Limpa a tabela antes de adicionar as novas linhas
        var tabelaDetalhes = $("#tabdetalhes");
        tabelaDetalhes.empty();

        // Preencher a tabela de detalhes
        item.detalhes.forEach(detalhe => {
            var linha = ` 
            <tr>
                <td>${detalhe.caracteristica}</td>
                <td>${detalhe.detalhes}</td>
            </tr>
            `;
            tabelaDetalhes.append(linha);
        });
    } else {
        console.log('Produto não encontrado');
    }
} else {
    console.log('Nenhum produto encontrado no localStorage');
}

var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarAoCarrinho(item, quantidade) {
    var itemNoCarrinho = carrinho.find(c => c.item.id === item.id);

    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional;
    } else {
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

$(".add-cart").on('click', function () {
    if (item) { // Certifique-se de que "item" está definido
        adicionarAoCarrinho(item, 1);

        var toastCenter = app.toast.create({
            text: `${item.nome} adicionado ao carrinho`,
            position: 'center',
            closeTimeout: 2000,
        });

        toastCenter.open();
    } else {
        console.error("Item não encontrado ao tentar adicionar ao carrinho.");
    }
});
