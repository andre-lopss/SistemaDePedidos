import {clientesLista} from "./clientes.js"
import {produtosLista } from "./produtos.js"

export{getRequestData, saveOrder}

const inpOrderCustomerCod = document.getElementsByName('codCliente')[1]
const inpOrderCustomerName = document.getElementsByName('nomeCliente')[1]
const inpOrderProductCod = document.getElementsByName('codigo')[1]
const inpOrderProductDesc = document.getElementsByName('descr')[1]
const inpOrderProductPreco= document.getElementsByName('preco')[1]
const inpOrderProductQuantEstq = document.getElementsByName('quantPedidoArray')[0]
const inpOrderProductQuant = document.querySelector("#quantPedido") 
let arrayCodigo = []
let arrayProdutos = []

function getRequestData(){
    inpOrderCustomerCod.addEventListener('focusout', (event) => {
        inpOrderCustomerName.value = clientesLista[event.target.value -1]["nomeCliente"];     
    })
    inpOrderProductCod.addEventListener('focusout', (event) => {
        inpOrderProductDesc.value = produtosLista[event.target.value -1]["descProduto"];
        inpOrderProductPreco.value = produtosLista[event.target.value -1]["precoProduto"];   
        inpOrderProductQuantEstq.value =  produtosLista[event.target.value -1]["qtdEstoqueProd"];   
     })                  
}

function validateFields(produtos){
    let msg = ''
    if(inpOrderCustomerCod.value == '' || inpOrderCustomerName.value == '' || inpOrderProductCod.value == '' || inpOrderProductDesc.value == '' || inpOrderProductPreco.value == '' || inpOrderProductQuant.value == ''){
        msg += 'Algum dos valores não está preenchido'
    }
    if( msg != ''){
        alert(msg)
        return false
    }
    return true
}

function clearOrders(){
    inpOrderCustomerCod.value = ''
    inpOrderCustomerName.value = ''
    inpOrderProductCod.value = ''
    inpOrderProductDesc.value = ''
    inpOrderProductPreco.value = ''
    inpOrderProductQuant.value = ''
    inpOrderProductQuantEstq.value = ''
}

function addOrder(product){
    arrayProdutos.push(product)      
}

function readRequestedData(){
    let produtos = {}

    produtos.codProduto = Number(inpOrderProductCod.value)
    produtos.descProduto = inpOrderProductDesc.value
    produtos.precoProduto = Number(inpOrderProductPreco.value)
    produtos.qtdEstoqueProd = Number(inpOrderProductQuant.value) 
    produtos.qtdEst = Number(inpOrderProductQuantEstq.value)
    produtos.subtotal = Number(inpOrderProductPreco.value) * Number(inpOrderProductQuant.value)

    return produtos
}

function saveOrder(){
    document.querySelector("#lancarProduto").addEventListener('click', function(){
       let product = readRequestedData()
       if(validateFields(product)){
        let elemento = inpOrderProductCod.value
            if(arrayCodigo.indexOf(elemento) !== -1){
                alert(`Item ${elemento}: ${inpOrderProductDesc.value} já foi adicionado na lista, escolha outro produto!`)
            }else if(Number(inpOrderProductQuant.value) > Number(inpOrderProductQuantEstq.value) ){
                alert(`Quantidade acima do permitido, que é ${inpOrderProductQuantEstq.value}`)
            }else{
                addOrder(product)
                listTable()
            }   
       }
        clearOrders()
    })
}

function somar(lista){
    let total = 0
    for(let valorProduto of lista){
        total += Number(valorProduto.dataset.soma)
    }
    return total;
}

function listTable(){
    let tbody = document.getElementById('tbody')    
    tbody.innerText = ''

    for(let i = 0; i < arrayProdutos.length; i++){
        //Adicionar Linha
        let tr = tbody.insertRow() 
        //Adicionar células nas colunas     
        let item = tr.insertCell();
        let descricao =  tr.insertCell();
        let preco =  tr.insertCell();
        let quantidade =  tr.insertCell();
        let subTotal = tr.insertCell();
        //Valores serem exibidos pela tabela na tela
        item.innerText = arrayProdutos[i].codProduto
        descricao.innerText = arrayProdutos[i].descProduto
        preco.innerText = arrayProdutos[i].precoProduto.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
        quantidade.innerText = arrayProdutos[i].qtdEstoqueProd 
        subTotal.innerText = arrayProdutos[i].subtotal.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
        //Classes e atributos para estilo
        item.setAttribute('class', 'center')
        quantidade.setAttribute('class', 'center')
        subTotal.setAttribute('class', 'filhos')
        subTotal.setAttribute('data-soma', arrayProdutos[i].subtotal)
        //Caixa do valor total
        document.querySelector("#valorTotal").value = somar(document.querySelectorAll(".filhos")).toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})

        arrayCodigo.push(inpOrderProductCod.value)  
    }               
}