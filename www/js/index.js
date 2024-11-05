fetch('js/backend.json')
.then(response => response.json())
.then(data=> {
    //salvando os dados vindo do backend localmente
    //vamos ultilizar um localstorage
    localStorage.setItem('produtos', JSON.stringify(data));
console.log('Dados dos produtos salvos no LocalStorage');

    //ESVAZIAR A AREA DE PRODUTOS
    $("#produtos").empty();

    

    data.forEach(produto => {
        var produtoHTML = ` <!-- ITEM CARD-->
                  <div class="item-card">
                    <a data-id="${produto.id}" href="/detalhes/" class="item">
                      <div class="img-container">
                        <img src="${produto.imagem}" />
                      </div>
                        <div class="nome-rating">
                          <span class="color-gray">${produto.nome}</span>
                          <span class="bold margin-rigth">
                            <i class="mdi mdi-star"></i>
                            ${produto.rating}
                          </span>
                        </div>
                        <div class="bold price"> ${produto.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
                    </a>
                  </div>
                  `;

                  $("#produtos").append(produtoHTML);

    });

    $(".item").on('click', function(){
        var id =  $(this).attr('data-id');
        localStorage.setItem('detalhe', id);
        app.views.main.router.navigate('/detalhes/');
    });

})
.catch(error => console.error('Error ao fazer fetch dos dados: ' + error))

setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    //alimentar o contador da sacola
    $('.btn-cart').attr('data-count', carrinho.length);

}, 300);