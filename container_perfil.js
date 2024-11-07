function mostrarArtistas() {
    const galeria = document.getElementById("galeria");
        galeria.innerHTML = `
        <div class="imagens">
            <img src="../imgs/foto_perfil.jpeg" alt="">
            <img src="../imgs/foto_perfil.jpeg" alt="">
            <img src="../imgs/foto_perfil.jpeg" alt="">
        </div>
        <div class="imagens">
            <img src="../imgs/foto_perfil.jpeg" alt="">
            <img src="../imgs/foto_perfil.jpeg" alt="">
            <img src="../imgs/foto_perfil.jpeg" alt="">
        </div>
    `;
    galeria.style.display = "block"; // Mostra a galeria

    // Desabilita o botão "Artistas" e habilita "Músicas"
    document.getElementById("botao_artistas").disabled = true;
    document.getElementById("botao_musicas").disabled = false;
}

function mostrarMusicas() {
    const galeria = document.getElementById("galeria");
        galeria.innerHTML = `
        <div class="musicas">
            <audio controls class="musica"><source src="/assets_tutorials/media/Loreena_Mckennitt_Snow_56bit.mp3" type="audio/mpeg"></audio>
            <audio controls class="musica">Música 2</audio>
            <audio controls class="musica">Música 3</audio>
        </div>
        <div class="musicas">
            <audio controls class="musica">Música 4</audio>
            <audio controls class="musica">Música 5</audio>
            <audio controls class="musica">Música 6</audio>
        </div>
    `;
    galeria.style.display = "block"; // Mostra a galeria

    // Desabilita o botão "Músicas" e habilita "Artistas"
    document.getElementById("botao_musicas").disabled = true;
    document.getElementById("botao_artistas").disabled = false;
}
