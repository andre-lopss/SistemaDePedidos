export{inpCodProdu, inpDescProdu, inpPrecoProdu, inpQuantProdu, produtosLista,clearProductFields, listProduct, productPositionOne} 

const inpCodProdu = document.querySelector("#codProduto")
const inpDescProdu = document.querySelector("#descProduto")
const inpPrecoProdu = document.querySelector("#precoProduto")
const inpQuantProdu = document.querySelector("#qtdEstoqueProd")

const produtosLista = [
    {
      "codProduto"   : 1,
      "descProduto"  : "Caneta esferográfica",
      "precoProduto" : 0.80,  
      "qtdEstoqueProd" : 10, 
    },    
    {
      "codProduto"   : 2,
      "descProduto"  : "Cola Print",
      "precoProduto" : 3.65, 
      "qtdEstoqueProd" : 50,   
    },     
]

function clearProductFields(){
    inpCodProdu.value = ''
    inpDescProdu.value = ''
    inpPrecoProdu.value = ''
    inpQuantProdu.value = ''
}

function productPositionOne(){
    inpCodProdu.value = produtosLista[0].codProduto
    inpDescProdu.value = produtosLista[0].descProduto
    inpPrecoProdu.value = produtosLista[0].precoProduto
    inpQuantProdu.value = produtosLista[0].qtdEstoqueProd
}

function displayProductResult(valor){ 
    for( let campo in valor){
        if(document.querySelector(`#${campo}`)){
           document.querySelector(`#${campo}`).value = `${valor[campo]}`
        }
    }
}

function listProduct(codigo){
    if(Number(codigo) != produtosLista[codProduto.value]){
        displayProductResult(produtosLista[Number(codigo) - 1])
    }
}