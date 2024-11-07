
let nomeplaylist
document.getElementById('criar').addEventListener('click', ()=>{
    novoNome = prompt('Que nome deseja dar a sua playlist?')
   document.getElementById('pastas').innerHTML = 
   `      <div><button onclick="adicionar()"><h1>+</h1></button></div>
   <div class="mensagem3">
      <img  class="reproduzir" src="imagens/icons8-reproduzir-50.png" alt=""><button onclick="suaPlaylist()" class="tituloPlaylist">${novoNome}</button>
   </div>`
})
let novoNome;
function adicionar(){
    novoNome = prompt('Que nome deseja dar a sua playlist?')
    document.getElementById('pastas').innerHTML += `<div class="mensagem3">
    <img  class="reproduzir" src="imagens/icons8-reproduzir-50.png" alt=""><button onclick="suaPlaylist()" class="tituloPlaylist">${novoNome}</button> 
 </div>`
}
function suaPlaylist(){
    document.getElementById('musicas_').innerHTML=`
    <div class="container3">
    <div class="capa-playlist">
        <img class="nota-musical" src="imagens/nota-musical.jpg" alt="">
        <h1 class="titulo-playlist">${novoNome}</h1>
    </div>
    <div class="corpo-playlist" id="corpo-playlist">
        <div class="mensagem-add"><h2 class="mensagem-add-2" onclick="addPrimeira()" id="meubotao">+ Adicione uma música</h2></div>
     
    </div>
</div>
    `
}


function oi(){
   document.getElementById('musicas_').innerHTML=
   ` <div class="paginaArtista">
   <div class="artista2">
   <div class="imagem_album">
       <img src="https://i.scdn.co/image/ab67616d0000b27363ecdc2fc549275b51fbb9a7" alt="Capa Do Album" id="imagem">
   </div>
   <div class="imagem_do_artista">
       <h1 class="titulo_novo">333</h1>
       <img src="https://i.scdn.co/image/ab6761610000e5eb654dc6b69f86aeb73527fc07" alt="Foto do Artista"
       id="imgArtista">
       <h4 id="nomeArtista">Matuê</h4>
   </div>
   
  
</div>
</header>
<div class="botoes">
<button id="play"><i class="fa-solid fa-play"></i></button>
</div>
<div class="musicas">
<p id='num1'>1</p>
<h4 id="nomeMusica1">Crack com Mussilon</h4>
<p id="artista1">Matuê</p>
</div>
<div class="musica2">
<p id='num2'>2</p>
<h4 id="nomeMusica2">Imagina esse Cenário</h4>
<p id="artista2">Matuê, Veigh</p>
</div>
<div class="musica3">
<p id='num3'>3</p>
<h4 id="nomeMusica3" onclick="issoEserio()">Isso é Sério</h4>
<p id="artista3" onclick="issoEserio()">Matuê, Brandão85</p>
</div>
<div class="musica4">
<p id='num4'>4</p>
<h4 id="nomeMusica4">1993</h4>
<p id="artista4">Matuê</p>
</div>
<div class="musica5">
<p id='num5'>5</p>
<h4 id="nomeMusica5">4tal</h4>
<p id="artista5">Matuê, Teto</p>
</div>
<div class="musica6">
<p id='num6'>6</p>
<h4 id="nomeMusica6">O Som</h4>
<p id="artista6">Matuê</p>
</div>
<div class="musica7">
<p id='num7'>7</p>
<h4 id="nomeMusica7">04AM</h4>
<p id="artista7">Matuê</p>
</div>
<div class="musica8">
<p id='num8'>8</p>
<h4 id="nomeMusica8">Castlevania</h4>
<p id="artista8">Matuê</p>
</div>
<div class="musica9">
<p id='num9'>9</p>
<h4 id="nomeMusica9">V de Vilão</h4>
<p id="artista9">Matuê</p>
</div>
<div class="musica10">
<p id='num10'>10</p>
<h4 id="nomeMusica10">Maria</h4>
<p id="artista10">Matuê</p>
</div>
<div class="musica11">
<p id='num11'>11</p>
<h4 id="nomeMusica11">333</h4>
<p id="artista11">Matuê</p>
</div>
<div class="musica12">
<p id='num12'>12</p>
<h4 id="nomeMusica12">Like This!</h4>
<p id="artista12">Matuê</p>
</div>`
}
function explorar(){
   document.getElementById('musicas_').innerHTML=`
   <div id="apareca">
        <div class="fade-in" id="recado">
            <h1 class="fade-in" id="tituloRecado">Ouça o album mais <br> ouvido do momento</h1>
            <img class="fade-in" onclick="oi()" id="maisOuvido" src="https://i.scdn.co/image/ab67616d0000b27363ecdc2fc549275b51fbb9a7">
            <h1 class="fade-in" id="tituloRecado">333</h1>
        </div>
    </div>`
}
function addPrimeira(){
    const nomeMusica = prompt('Digite o nome da música')
    if(nomeMusica == 'maçã verde'){
        document.getElementById('corpo-playlist').innerHTML = `
        <div class="mensagem-add"><h2 class="mensagem-add-2" onclick="addMusica()">+ Adicione uma música</h2></div>
        <div class="musica-playlist">
            <h4 style="color: white;">Maçã Verde</h4>
            <p >Hariel</p>
        </div>
        `
    }else{
        alert('música não encontrada')
    }
}
function addMusica(){
    const nomeMusica = prompt('Digite o nome da música')
    if (nomeMusica== 'apaguei pra todos'){
        document.getElementById('corpo-playlist').innerHTML += `
        <div class="musica-playlist">
            <h4 style="color: white;">Apaguei pra todos</h4>
            <p >Ferrugem</p>
        </div>`
    } else if (nomeMusica== 'vem desestressar'){
        document.getElementById('corpo-playlist').innerHTML += `
        <div class="musica-playlist">
            <h4 style="color: white;">Vem Desestressar</h4>
            <p >MC PH, Vulgo FK, Veigh</p>
        </div>`
    } else if (nomeMusica== '365 dias'){
        document.getElementById('corpo-playlist').innerHTML += `
        <div class="musica-playlist">
            <h4 style="color: white;">365 Dias(Vida Mansa)</h4>
            <p >MC Marks</p>
        </div>`
    }else if (nomeMusica== 'mesma historia'){
        document.getElementById('corpo-playlist').innerHTML += `
        <div class="musica-playlist">
            <h4 style="color: white;">Mesma História</h4>
            <p >Orochi, Caio Luccas</p>
        </div>`
    }else if (nomeMusica== 'ninguém entende nada'){
        document.getElementById('corpo-playlist').innerHTML += `
        <div class="musica-playlist">
            <h4 style="color: white;">Ninguém Entende Nada</h4>
            <p >Teto, MC PH</p>
        </div>`
    
    }else if (nomeMusica== 'mitsubishi'){
        document.getElementById('corpo-playlist').innerHTML += `
        <div class="musica-playlist">
            <h4 style="color: white;">Mitsubishi</h4>
            <p >Orochi</p>
        </div>`
    }
    else if (nomeMusica== 'bloco de 100'){
        document.getElementById('corpo-playlist').innerHTML += `
        <div class="musica-playlist">
            <h4 style="color: white;">Bloco de 100</h4>
            <p >Hariel, Dfideliz</p>
        </div>`
    }else{
        alert('música não encontrada')
    }
}

function issoEserio(){
    window.location.href = "musica.html"
}
async function submitForm() {
    const usr = document.getElementById('usr').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/dados');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        alert('Cadastro concluído!'); 

       
        setTimeout(() => {
            window.location.href = 'login.html'; 
        }, 1000);

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao cadastrar usuário: ' + error.message);
    }
}
async function mostrarMusicaAleatoria() {
    try {
        const response = await fetch('http://localhost:3000/musica-aleatoria');
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        const musicasDiv = document.getElementById("musicas_");

        // Limpa o conteúdo existente
        musicasDiv.innerHTML = '';

        // Cria e adiciona a imagem
        const img = document.createElement("img");
        img.className = 'capa_aleatoria'
        img.src = data.imagem_url;
        img.alt = data.titulo;
        img.style.display = 'block';
        img.style.margin = '0 auto';

        // Cria e adiciona o título
        const titulo = document.createElement("h3");
        titulo.className = "titulo_aleatorio"
        titulo.textContent = data.titulo;
        titulo.style.textAlign = 'center';
        
        const artistas = document.createElement("h5")
        artistas.className = "artistas_aleatorio"
        artistas.textContent = data.artista
        

        musicasDiv.appendChild(img);
        musicasDiv.appendChild(titulo);
    } catch (error) {
        console.error("Erro ao buscar música aleatória:", error);
    }
}

function proibir(){
    alert('Crie ou faça login na sua conta')

}
function toggleDropdown() {
    var dropdown = document.getElementById("dropdown-content");
    dropdown.classList.toggle("show");
}


window.onclick = function(event) {
    if (!event.target.matches('.foto_usuario')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

   

/*function mostrarMensagem(){
    const mensagem = document.getElementById('mensagem')
    const mensagens = [
        "Bem-vindo ao Spotifly!",
        "Explore músicas e playlists.",
        "Curta suas músicas favoritas.",
        "Descubra novos artistas todos os dias."
    ]
    let indice = 0;

    mensagem.innerHTML = mensagens[indice]
    setInterval(function() {
        indice +=1
       if (indice < 3){
        mensagem.innerHTML = mensagens[indice]
       }else{
        indice = 0
        mensagem.innerHTML = mensagens[indice]
        indice +=1
       }
    }, 5000)
    
}*/
function mostrarMensagem() {
    const mensagem = document.getElementById('mensagem');
    const mensagens = [
        "Bem-vindo ao Spotifly!",
        "Explore músicas e playlists.",
        "Curta suas músicas favoritas.",
        "Descubra novos artistas todos os dias.",
        "Crie uma conta e curta agora",
    ];
    let indice = 0;
    
    function digitarMensagem(texto) {
        let letraIndice = 0;
        mensagem.innerHTML = ""; // Limpa a mensagem anterior

        const intervalo = setInterval(function() {
            // Adiciona uma letra ao texto
            mensagem.innerHTML += texto[letraIndice];
            letraIndice++;

            // Quando todas as letras tiverem sido adicionadas, limpa o intervalo
            if (letraIndice === texto.length) {
                clearInterval(intervalo);
            }
        }, 100); // A cada 100ms, uma letra é adicionada
    }

    function atualizarMensagem() {
        const mensagemAtual = mensagens[indice];
        digitarMensagem(mensagemAtual); // Chama a função para digitar a mensagem
        indice = (indice + 1) % mensagens.length; // Atualiza o índice
    }

    // Exibe a primeira mensagem imediatamente
    atualizarMensagem();
    
    // Configura o intervalo para atualizar a mensagem a cada 5 segundos
    setInterval(atualizarMensagem, 5000);
}window.onload = mostrarMensagem;




