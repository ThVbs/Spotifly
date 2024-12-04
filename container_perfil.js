function mostrarArtistas() {
    const galeria = document.getElementById("galeria");
        galeria.innerHTML = `
        <div class="imagens">
            <img src="https://s2-g1.glbimg.com/sGcCILaAM7zBv-Ly1YQKgiCwO08=/0x0:1495x1240/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/U/3/EvMSXuRCmppQT5WUtZqg/tim1971.jpg" alt="tim mais">
            <img src="https://yt3.googleusercontent.com/FOnFpOfTPFk0pcVblYLBDlTvp5FoT9TmRmlSFzF-1Q4z5sVToedGvRpc9tmFo9daSjMRhob6ee8=s900-c-k-c0x00ffffff-no-rj" alt="marilia mendonça">
            <img src="https://cdn-images.dzcdn.net/images/artist/38565abd42a683c4585efdd3b8a53154/1900x1900-000000-80-0-0.jpg" alt="luan santana">
        </div>
        <div class="imagens">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntD44MZp52ZDW73oodyefzrEiBusvRlfISA&s" alt="lucas lucco">
            <img src="https://cdn-images.dzcdn.net/images/artist/3494cede2d721e7b92b898d8b08ea5cc/500x500.jpg" alt="hungria">
            <img src="https://yt3.googleusercontent.com/wcf5cHqbnEzQrYKwNG6-ywexrSbD_xJjxvuQQj0WA-ojvIPxYnbhVRzfOEN3zZKxB1iBE0MDgQA=s900-c-k-c0x00ffffff-no-rj" alt="mc jacaré">
        </div>
    `;
    galeria.style.display = "block"; // Mostra a galeria

    // Desabilita o botão "Artistas" e habilita "Músicas"
    document.getElementById("botao_artistas").disabled = true;
    document.getElementById("botao_musicas").disabled = false;
}

function toggleFollow(button) {
    const followersElement = document.getElementById('followers');
    let currentCount = parseInt(followersElement.textContent, 10);

    if (button.textContent === "Seguir") {
        // Incrementa seguidores e altera texto do botão
        currentCount++;
        button.textContent = "Deixar de Seguir";
    } else {
        // Decrementa seguidores e altera texto do botão
        currentCount--;
        button.textContent = "Seguir";
    }

    // Atualiza o contador de seguidores
    followersElement.textContent = currentCount;
}