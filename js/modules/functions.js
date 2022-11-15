import {clientesLista, inpCodCustomer, inpDatCadCustomer, inpNameCustomer, clearCustomerFields, customerPositionOne, formatDate, listCustomer} from './clientes.js'

import {inpCodProdu, inpDescProdu, inpPrecoProdu, inpQuantProdu, produtosLista,clearProductFields, listProduct, productPositionOne} from './produtos.js'

export{hideDisplay, openForms, closeForms, goList, goBackList, newItem, menuClick, save}
//Constante para manipulação no menu responsivo
const navUl = document.querySelector('nav ul')

function hideDisplay(){
    let formDisplay = document.querySelectorAll(".formularioDisplay")
    for(let item of formDisplay){
        item.style.display = 'none'
    }
}

function openForms(){
    for(let i of document.getElementsByClassName('nav-menu')){
        hideDisplay()
        i.addEventListener('click', (e) => {
            if(e.target.id == 'clientesOpen'){
                hideDisplay()
                navUl.classList.remove('open')
                document.querySelector("#clientes").style.display = 'block'
                customerPositionOne();
            }else if(e.target.id == 'produtosOpen'){
                hideDisplay()
                navUl.classList.remove('open')
                document.querySelector("#produtos").style.display = 'block'
                productPositionOne()
            }else{
                hideDisplay()
                navUl.classList.remove('open')
                document.querySelector("#pedidos").style.display = 'block'
            }            
        })        
    }    
}

function closeForms(){
    for(let i of document.getElementsByClassName('close')){
        i.addEventListener('click', (e) => {
            if(e.target.id == 'closeClientes' || e.target.id == 'closeProdutos' || e.target.id == 'closePedidos'){
                hideDisplay()
            }  
        })        
    }    
}

function goList(numero){
    for(let i of document.getElementsByClassName('btns-avanc')){
        i.addEventListener('click', (e) => {
            if(e.target.id === 'btnAvancarClientes'){
                if(numero > 0 || numero <= clientesLista.length){
                    listCustomer(numero);
                    numero++
                    if(numero > clientesLista.length + 1){
                        alert("Fim da lista de clientes")
                        numero = 2;
                    }                
                }
            }else{
                if(numero > 0 || numero <= produtosLista.length){
                    listProduct(numero);
                    numero++
                    if(numero > produtosLista.length + 1){
                        alert("Fim da lista de produtos")
                        productPositionOne()
                        numero = 2; 
                    }
                }
            }            
        })        
    } 
}

function goBackList(){
    for(let i of document.getElementsByClassName('btns-voltar')){
        i.addEventListener('click', (e) => {
            if(e.target.id == 'btnVoltarClientes'){
                let numero = Number(inpCodCustomer.value)
                if(numero > 0 || numero <= clientesLista.length){  
                    numero = Number(inpCodCustomer.value)
                    numero--
                    listCustomer(numero);
                    if(numero <= 0){
                        alert("Avance")
                    }
                }                                  
            }else{
                let numero = Number(inpCodProdu.value)
                if(numero > 0 || numero <= produtosLista.length){  
                    numero = Number(inpCodProdu.value)
                    numero--
                    listProduct(numero);
                    if(numero <= 0){
                        alert("Avance")
                    }
                }
            }            
        })       
    }  
}

function newItem(){
    for(let i of document.getElementsByClassName('novo')){
        i.addEventListener('click', (e) => {
            if(e.target.id == 'novoCliente'){
                clearCustomerFields();
                inpCodCustomer.value = clientesLista.length + 1
                inpDatCadCustomer.value = formatDate()
            }else{
                clearProductFields();
                inpCodProdu.value = produtosLista.length + 1
            }            
        })        
    }    
}

function save(){
    for(let i of document.getElementsByClassName('salvar')){
        i.addEventListener('click', (e) => {
            if(e.target.id == 'salvarCliente'){
                if(inpCodCustomer.value != '' && inpNameCustomer.value != '' && inpDatCadCustomer.value != '' && inpCodCustomer.value > clientesLista.length){  
                    clientesLista.push({
                        codCliente : Number(inpCodCustomer.value),
                        nomeCliente : inpNameCustomer.value,    
                        dataCadCli : inpDatCadCustomer.value
                    }) 
                alert('Cliente cadastrado!')
                }else if(inpNameCustomer.value == '' && inpCodCustomer.value != '' && inpDatCadCustomer.value != ''){
                    alert('Adicione o nome do cliente para salvar!')
                }
                else{
                    alert(`Clique no botão "NOVO", para adicionar e salvar um novo cliente`)
                }
                customerPositionOne()
            }else{
                if(inpCodProdu.value != '' && inpDescProdu.value != '' && inpPrecoProdu.value != '' && inpQuantProdu.value != '' && 
                inpCodProdu.value > produtosLista.length)
                    {  
                        produtosLista.push({
                        codProduto : Number(inpCodProdu.value),
                        descProduto : inpDescProdu.value,
                        precoProduto : Number(inpPrecoProdu.value) ,
                        qtdEstoqueProd : inpQuantProdu.value   
                     }) 
                    alert("Produto salvo!")    
                }else{
                    alert("Algum(s) dos valores não está(ão) preenchido(os) ou não foi selecionada a opção NOVO. Favor preencher o campo na lista de produtos ou clicar no botão!")
                }
                productPositionOne()
            }            
        })        
    }    
}
//Menu responsivo
function menuClick(){ 
    document.querySelector(".menu-btn").addEventListener('click', function(){
        if(navUl.classList.contains('open')){
            navUl.classList.remove('open')
        }else{
            navUl.classList.add('open')
            hideDisplay()
        }
    })
}