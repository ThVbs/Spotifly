let nomePlaylist;

let novoNome;

function explorar() {
    document.getElementById('musicas_').innerHTML = `
   <div id="apareca">
        <div class="fade-in" id="recado">
            <h1 class="fade-in" id="tituloRecado">Ouça o album mais <br> ouvido do momento</h1>
            <img class="fade-in" onclick="oi()" id="maisOuvido" src="https://i.scdn.co/image/ab67616d0000b27363ecdc2fc549275b51fbb9a7">
            <h1 class="fade-in" id="tituloRecado">333</h1>
        </div>
    </div>`;
}


function adicionar() {
    novoNome = prompt('Que nome deseja dar a sua playlist?');
    document.getElementById('pastas').innerHTML += `<div class="mensagem3">
    <img class="reproduzir" src="imagens/icons8-reproduzir-50.png" alt=""><button onclick="suaPlaylist()" class="tituloPlaylist">${novoNome}</button> 
 </div>`;
}

function suaPlaylist() {
    document.getElementById('musicas_').innerHTML = `
    <div class="container3">
    <div class="capa-playlist">
        <img class="nota-musical" src="imagens/nota-musical.jpg" alt="">
        <h1 class="titulo-playlist">${novoNome}</h1>
    </div>
    <div class="corpo-playlist" id="corpo-playlist">
        <div class="mensagem-add"><h2 class="mensagem-add-2" onclick="addPrimeira()" id="meubotao">+ Adicione uma música</h2></div>
    </div>
</div>
    `;
}


async function carregarPlaylist() {
    
    try {
        const response = await fetch('http://127.0.0.1:3000/puxar')
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const editar = document.getElementById('pastas')
        

        const data = await response.json();
        for (let i=0; i< data.length; i++){
            console.log(data[i].titulo)
            editar.innerHTML += `<div class="mensagem3">
            <img class="reproduzir" src="imagens/icons8-reproduzir-50.png" alt=""><button onclick="suaPlaylist()" class="tituloPlaylist">${data[i].titulo}</button> 
         </div>`
         
        }
       
    } catch (error) {
        console.error('Erro ao carregar a playlist:', error);
    }
}

async function criarPlaylist() {
    const titulo = prompt('Digite o título da playlist:');

    if (!titulo) {
        alert('O título da playlist é obrigatório!');
        return;  // Se não digitar nada, cancela a ação
    }

    try {
        const response = await fetch('http://localhost:3000/criar-playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo })  // Certifique-se de enviar 'titulo'
        });

        if (!response.ok) {
            throw new Error('Erro ao criar a playlist');
        }

        const data = await response.json();
        console.log('Playlist criada com sucesso:', data);

        alert('Playlist criada com sucesso!');
        
       
        location.reload();   // ou o caminho para a sua página de playlists
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível criar a playlist.');
    }
}
async function logout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok) {
            // Exibe a mensagem de sucesso e redireciona o usuário para a página de login
            alert(result.message);
            window.location.href = '/Spotifly/html/login.html';  // Ou o caminho correto para a página de login
        } else {
            // Exibe a mensagem de erro caso a requisição falhe
            alert(result.error || 'Erro ao fazer logout');
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Não foi possível fazer logout.');
    }
}



           
    

  

