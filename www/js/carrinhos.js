var localCarrinho = localStorage.getItem('carrinho');

if(localCarrinho){
    var carrinho = JSON.parse(localCarrinho)
    if(carrinho.length >0){
        //itens no carrinho
        //renderizar o carrinho
        renderizarCarrinho()
        //somar os produtos
        calcularTotal()
    }else{
        //mostrar carrinho vazio
        carrinhoVazio();
    }
}else{
    //mostrar carrinho vazio
    carrinhoVazio();
}

function renderizarCarrinho(){

    $("#listaCarrinho").empty();

    //percorrer o noss carrinho e alimentar a area
    $.each(carrinho, function(index, itemCarrinho){
        var itemDiv = `
        <div class="item-carrinho">
            <div class="area-img">
              <img src="${itemCarrinho.item.imagem}">
            </div>
            <div class="area-details">
              <div class="sup">
                <span class="name-prod">
                ${itemCarrinho.item.nome}
                </span>
                <a data-index="${index}" class="delete-item" href="#"> <!-- Correção aqui -->
                  <i class="mdi mdi-close"></i>
                </a>
              </div>
              <div class="middle">
                <span>${itemCarrinho.item.principal_caracteristica}</span>
              </div>
              <div class="preco-quantidade">
                <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                <div class="count">
                  <a class="minus" data-index="${index}" href="#">-</a>
                  <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}">
                  <a class="plus" data-index="${index}" href="#">+</a>
                </div>
              </div>
           </div>
          </div>
          `;

          $("#listaCarrinho").append(itemDiv);
    });

    $(".delete-item").on('click', function (){

        var index = $(this).data('index');
        //confirmar
        app.dialog.confirm('Tem certeza que quer remover este item?', 'remover', function(){
    
            carrinho.splice(index, 1);
            //atualizar o carrinho com o item removido
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            //atualizar a pagina
            app.views.main.router.refreshPage();
    
        });
    });


$("#confirmarAgendamento").on('click', function() {
    // Limpar o carrinho do localStorage
    localStorage.removeItem('carrinho');
    carrinho = [];
    renderizarCarrinho();
    
    // Enviar e-mail de confirmação
    enviarEmailAgendamento();

    // Exibir mensagem de confirmação e fechar o pop-up
    app.dialog.alert("Sua busca foi agendada. Você tem o prazo de 7 dias para buscá-la. Caso não busque, você será bloqueado de agendar por 1 mês.", "Agendamento Confirmado");
    app.popup.close('#modalAgendamento');
});

function enviarEmailAgendamento() {
    // Configuração do e-mail com EmailJS
    emailjs.send("service_o89meuo", "YOUR_TEMPLATE_ID", {
        user_name: "Luiz Fernando",  // Substitua com o nome do usuário ou pegue do carrinho
        message: "Sua busca foi agendada. Você tem o prazo de 7 dias para buscá-la.",
        email: "lipeleal2003@gmail.com" // E-mail do usuário, substitua pelo e-mail real
    })
    .then(function(response) {
        console.log("E-mail enviado com sucesso!", response.status, response.text);
    }, function(error) {
        console.error("Erro ao enviar o e-mail:", error);
    });
}








    $(".minus").on('click', function () {
        var index = $(this).data('index');
    
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--;
            carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
            calcularTotal();
        } else {
            var itemname = carrinho[index].item.nome;
            app.dialog.confirm(`Gostaria de remover <strong>${itemname}</strong>?`, 'REMOVER', function () {
                carrinho.splice(index, 1);
                // Atualiza o localStorage após remover o item
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                // Renderiza o carrinho e recalcula o total
                renderizarCarrinho();
                calcularTotal();
            });
        }
    });

    // JavaScript para gerenciar a seleção de tamanho e a mensagem de confirmação
    $(document).ready(function() {
        // ... (código anterior)
    
        $("#agendarBusca").on('click', function() {
            app.popup.open('#modalAgendamento');
        });
    
        $("#confirmarAgendamento").on('click', function() {
            // Limpar o carrinho do localStorage
            localStorage.removeItem('carrinho'); // Remove o carrinho do localStorage
            carrinho = []; // Limpa a variável carrinho
            renderizarCarrinho(); // Atualiza a interface do carrinho para refletir que está vazio
            app.dialog.alert("Sua busca foi agendada. Você tem o prazo de 7 dias para buscá-la. Caso não busque, você será bloqueado de agendar por 1 mês.", "Agendamento Confirmado");
            app.popup.close('#modalAgendamento'); // Fecha o pop-up após a confirmação
        });
    
        $("#fecharAgendamento").on('click', function() {
            app.popup.close('#modalAgendamento');
        });
        
    });
    

    $(".plus").on('click', function (){

        var index = $(this).data('index');
        
        carrinho[index].quantidade++;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;


        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        calcularTotal();
    });


}

function calcularTotal(){
    var totalCarrinho = 0;
    $.each(carrinho, function (index, itemCarrinho){
        totalCarrinho += itemCarrinho.total_item;
    });
    $("#subtotal").html(totalCarrinho.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
}

function carrinhoVazio(){
    console.log('Carrinho está vazio')
    $("#listaCarrinho").empty();

    //sumir os itens de baixo bptao e totai
    $("#toolbarTotais").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');

    $("#listaCarrinho").html(`
        <div class="text-align-center">
            <img width="300" src="img/empty.gif">
            <br><span> Venha agendar seu item e retira-lo com <br>segurança antecedencia e prioridade!</span>
        </div>
        `);    
}

$("#esvaziar").on('click', function(){
    app.dialog.confirm('Tem certeza que quer esvaziar o carrinho?', '<strong>ESVAZIAR</strong>', function(){
        //apagar o localstorage do carrinho
        localStorage.removeItem('carrinho');
        app.views.main.router.refreshPage();
    });
})
