export {clientesLista, inpCodCustomer, inpDatCadCustomer, inpNameCustomer, clearCustomerFields, customerPositionOne, formatDate, listCustomer}

const  clientesLista = [
    {
        "codCliente"   : 1,
        "nomeCliente"  : "Donald Blake",
        "dataCadCli" :"12/10/2010",
    },
    {
        "codCliente"   : 2,
        "nomeCliente"  : "Bruce Wayne",
        "dataCadCli" :"01/08/2017",
    },
    {
        "codCliente"   : 3,
        "nomeCliente"  : "Diana",
        "dataCadCli" :"02/05/2020",
    },          
]

const inpCodCustomer = document.querySelector("#codCliente");
const inpNameCustomer = document.querySelector("#nomeCliente");
const inpDatCadCustomer = document.querySelector("#dataCadCli");

function formatDate(){
    let novaData = new Date()
    return novaData.toLocaleString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'})
}

function displayCustomerResult(valor){ 
    for( let campo in valor){
        if(document.querySelector(`#${campo}`)){
           document.querySelector(`#${campo}`).value  = `${valor[campo]}`
        }
    }
}

function listCustomer(codigo){ 
    if(Number(codigo) != clientesLista["codCliente"]){
        displayCustomerResult(clientesLista[Number(codigo) - 1])
    }
}       

function clearCustomerFields(){
    inpCodCustomer.value = ''
    inpNameCustomer.value = ''
    inpDatCadCustomer.value = ''
}

function customerPositionOne(){
    inpCodCustomer.value = clientesLista[0].codCliente
    inpNameCustomer.value = clientesLista[0].nomeCliente
    inpDatCadCustomer.value = clientesLista[0].dataCadCli
}