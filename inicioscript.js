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
let idGlobal 




async function carregarPlaylist() {
    try {
        const response = await fetch('/puxar');
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const editar = document.getElementById('pastas');
        const data = await response.json();

        console.log(data);

        for (let i = 0; i < data.length; i++) {
            console.log(data[i].titulo);
            editar.innerHTML += `
                <div class="mensagem3">
                    <img class="reproduzir" src="/Spotifly/imagens/icons8-reproduzir-50.png" alt="">
                    <button 
                        onclick="suaPlaylist(this)" 
                        data-id="${data[i].id}" 
                        class="tituloPlaylist">
                        ${data[i].titulo}
                    </button> 
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar a playlist:', error);
    }
}

function proibir(){
    alert('Crie ou faça login em uma conta')
}

// Função para exibir as mensagens com efeito de digitação
function exibirMensagens() {
    const mensagens = [
        "Bem-vindo ao Spotifly!",
        "Crie sua conta e aproveite a experiência.",
        "Descubra suas músicas favoritas.",
        "Explore playlists personalizadas."
    ];

    let i = 0;  // Índice da frase atual
    let j = 0;  // Índice da letra atual
    const modalConteudo = document.getElementById('modalMensagens');
    const mensagemElement = document.getElementById('mensagem');

    // Função para digitar letra por letra
    function digitarMensagem() {
        if (j < mensagens[i].length) {
            mensagemElement.innerHTML += mensagens[i].charAt(j);
            j++;
            setTimeout(digitarMensagem, 100); // Ajuste a velocidade da digitação aqui
        } else {
            i++;
            if (i < mensagens.length) {
                j = 0;
                mensagemElement.innerHTML = ''; // Limpa a mensagem anterior
                setTimeout(digitarMensagem, 2000); // Aguarda 2 segundos antes de mostrar a próxima frase
            } else {
                // Quando todas as mensagens foram exibidas, reinicia o processo
                setTimeout(function() {
                    i = 0;
                    mensagemElement.innerHTML = ''; // Limpa a última mensagem
                    digitarMensagem(); // Reinicia a digitação
                }, 2000); // Atraso de 2 segundos antes de reiniciar
            }
        }
    }

    // Inicia o efeito de digitação
    digitarMensagem();
    
    // Exibe o modal
}




async function suaPlaylist(element) {
    const idGlobal = element.getAttribute('data-id');
    console.log(idGlobal);

    // Obtém as músicas da playlist pelo ID
    const musicas = await carregarMusicasDaPlaylist(idGlobal);

    // Recria o conteúdo dinâmico
    document.getElementById('musicas_').innerHTML = `
        <div class="container3">
            <div class="capa-playlist">
                <img class="nota-musical" src="imagens/nota-musical.jpg" alt="">
                <h1 class="titulo-playlist">Playlist Midia</h1>
            </div>
            <div id="musicas-carregadas">
                <h2 id="suas_musics">Suas Músicas</h2>
                <ul>
                    ${musicas.map(musica => `<li style="color: white;">${musica.nome_musica}</li>`).join('')}
                </ul>
            </div>
            <div class="corpo-playlist" id="corpo-playlist">
                <form id="pesquisaForm">
                    <div class="mensagem-add">
                        <input type="text" id="pesquisaInput" placeholder="Digite o título da música">
                        <button type="submit" id="botao_pesquisa">Pesquisar</button>
                    </div>
                </form>
            </div>
            <div id="resultados">
                <h2 id="resultsAll">Resultados:</h2>
                <ul id="listaResultados"></ul>
            </div>
        </div>
    `;

    // Adiciona evento ao formulário de pesquisa
    document.getElementById('pesquisaForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Novo formulário funcionando!');
        await pesquisarMusicas(idGlobal);
    });
}


async function carregarMusicasDaPlaylist(idPlaylist) {
    try {
        const response = await fetch('/playlist/musicas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_playlist: idPlaylist }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao carregar músicas: ${response.statusText}`);
        }

        const data = await response.json();
        return data.musicas;
    } catch (error) {
        console.error('Erro ao carregar músicas da playlist:', error);
        return [];
    }
}


async function pesquisarMusicas(idGlobal) {
    const input = document.getElementById('pesquisaInput').value;
    const listaResultados = document.getElementById('listaResultados');

    try {
        const response = await fetch('/pesquisar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pesquisa: input }),
        });

        const data = await response.json();
        console.log(data);

        // Limpa os resultados anteriores
        listaResultados.innerHTML = '';
        input.value = '';

        // Exibe os resultados
        if (data.musicas.length > 0) {
            data.musicas.forEach((musica) => {
                const li = document.createElement('li');
                li.style.color = 'white';

                const button = document.createElement('button');
                button.textContent = 'Adicionar';
                button.type = 'button'; // Impede submit
                button.style.marginLeft = '10px';

                // Evento para adicionar música
                button.addEventListener('click', async () => {
                    try {
                        const response = await fetch('/adicionar', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id_playlist: idGlobal,
                                nome_musica: musica.titulo,
                            }),
                        });

                        if (response.ok) {
                            alert('Música adicionada com sucesso!');
                        } else {
                            alert('Erro ao adicionar música.');
                        }
                    } catch (erro) {
                        console.error('Erro ao adicionar música:', erro);
                    }
                });

                li.textContent = `Título: ${musica.titulo}`;
                li.appendChild(button);
                listaResultados.appendChild(li);
            });
        } else {
            listaResultados.innerHTML = '<li>Nenhum resultado encontrado.</li>';
        }
    } catch (erro) {
        console.error('Erro ao buscar resultados:', erro);
    }
}
let ultimaMusica = null;


async function mostrarMusicaAleatoria() {
    try {
        const response = await fetch('/musica-aleatoria');
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const musica = await response.json();

        // Armazena a última música antes de gerar uma nova
        ultimaMusica = musica;

        // Seleciona o container para exibir a música
        const container = document.getElementById('musicas_');
        container.innerHTML = ''; // Limpa o conteúdo anterior

        // Cria a estrutura da música com os botões de controle
        const musicaDiv = document.createElement('div');
        musicaDiv.classList.add('musica');
        musicaDiv.innerHTML = `
            <img class="tamanho_da_imagem" src="${musica.imagem_url}" alt="${musica.titulo}" />
            <h2>${musica.titulo}</h2>
            <h3>${musica.artista}</h3>
            <audio class="audio-player" src="${musica.audio_url}" preload="none"></audio>
            <div class="player-controls">
                <button class="prev" onclick="voltarParaUltimaMusica()">Voltar</button>
                <button class="play-pause">Play</button>
                <button class="next" onclick="mostrarMusicaAleatoria()">Próxima</button>
            </div>
            <span class="time">00:00</span>
            <div class="player-progress">
                <div class="progress-bar"></div>
            </div>
        `;

        // Reproduzir o áudio ao clicar na música
        const audioPlayer = musicaDiv.querySelector('.audio-player');
        const playPauseButton = musicaDiv.querySelector('.play-pause');
        const timeDisplay = musicaDiv.querySelector('.time');
        const progressBar = musicaDiv.querySelector('.progress-bar');

        // Atualizar tempo da música
        audioPlayer.addEventListener('timeupdate', () => {
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
            const progress = (currentTime / duration) * 100;

            // Atualiza o tempo exibido
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            // Atualiza a barra de progresso
            progressBar.style.width = `${progress}%`;
        });

        // Controlar play/pause
        playPauseButton.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseButton.textContent = 'Pause';
            } else {
                audioPlayer.pause();
                playPauseButton.textContent = 'Play';
            }
        });

        container.appendChild(musicaDiv);
    } catch (error) {
        console.error('Erro ao buscar música aleatória:', error);
        alert('Não foi possível carregar a música. Tente novamente mais tarde.');
    }
}

function voltarParaUltimaMusica() {
    if (ultimaMusica) {
        mostrarMusicaComDados(ultimaMusica);
    } else {
        alert('Não há música anterior.');
    }
}
function mostrarMusicaComDados(musica) {
    const container = document.getElementById('musicas_');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    const musicaDiv = document.createElement('div');
    musicaDiv.classList.add('musica');
    musicaDiv.innerHTML = `
        <img class="tamanho_da_imagem" src="${musica.imagem_url}" alt="${musica.titulo}" />
        <h2>${musica.titulo}</h2>
        <h3>${musica.artista}</h3>
        <audio class="audio-player" src="${musica.audio_url}" preload="none"></audio>
        <div class="player-controls">
            <button class="play-pause">Play</button>
            <span class="time">00:00</span>
        </div>
        <div class="player-progress">
            <div class="progress-bar"></div>
        </div>
    `;

    // Reproduzir o áudio ao clicar na música
    const audioPlayer = musicaDiv.querySelector('.audio-player');
    const playPauseButton = musicaDiv.querySelector('.play-pause');
    const timeDisplay = musicaDiv.querySelector('.time');
    const progressBar = musicaDiv.querySelector('.progress-bar');
    const progressContainer = musicaDiv.querySelector('.player-progress');

    // Atualizar tempo da música
    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progress = (currentTime / duration) * 100;

        // Atualiza o tempo exibido
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // Atualiza a barra de progresso
        progressBar.style.width = `${progress}%`;
    });

    // Controlar play/pause
    playPauseButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    container.appendChild(musicaDiv);
}


async function carregarTresMusicasAleatorias() {
    try {
        const response = await fetch('/inicio-musicas-aleatorias');
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const musicas = await response.json();

        // Seleciona o container para exibir as músicas
        const container = document.getElementById('musicas_');
        container.innerHTML = ''; // Limpa o conteúdo anterior

        // Itera sobre as músicas e cria a estrutura para cada uma
        musicas.forEach(musica => {
            const musicaDiv = document.createElement('div');
            musicaDiv.classList.add('musica');
            musicaDiv.innerHTML = `
                <img class="tamanho_da_imagem" src="${musica.imagem_url}" alt="${musica.titulo}" class="imagem-musica" />
                <h2 class="titulo-musica">${musica.titulo}</h2>
                <h3 class="artista-musica">${musica.artista}</h3>
            `;
            musicaDiv.addEventListener('click', () => renderDetalhesMusica(musica));
            container.appendChild(musicaDiv);
        });
    } catch (error) {
        console.error('Erro ao buscar músicas aleatórias:', error);
        alert('Não foi possível carregar as músicas. Tente novamente mais tarde.');
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
            localStorage.clear();
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



           
    

  

