window.onload = function(){      
    document.querySelector("#btnEntrar").addEventListener('click', function(){
        (async function dadosUsers(){
    
            let fetchRoute = await fetch(`./json/usuario.json`);
            let dataUsers = await fetchRoute.json();
        
            validaUser(dataUsers)
        })();
        
        function validaUser(data){
            const userValue = document.querySelector("#Us").value
            const pswValue = document.querySelector("#Pass").value

            for( let i of data.users){
                if(i.user === userValue && i.pws === pswValue){
                    window.location.href = "./panel.html"
                    return
                }   
            }
            alert("Erro ao logar! Usuário ou senha incorreto(s)!")
        }
    })    
}