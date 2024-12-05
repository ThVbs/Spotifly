const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const session = require('express-session');
const port = 3001;
const path = require('path');
const jwt = require('jsonwebtoken');
const { reverse } = require('dns');

app.use(cors());
app.use(express.json());

var variavel_global_sessao

const pool = new Client({
    user: "postgres",
    host: "localhost",
    database: "Spotfly",
    password: "luccas3007",
    port: 5433,
});

pool.connect()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

    

    

app.post('/api/register', async (req, res) => {
    const { usr, email, senha } = req.body;

    if (!usr || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios: Usuário, email e senha" });
    }

    try {
        const existingUserQuery = 'SELECT * FROM usuario WHERE usr = $1 OR email = $2';
        const existingUserResult = await pool.query(existingUserQuery, [usr, email]);

        if (existingUserResult.rowCount > 0) {
            return res.status(400).json({ error: "Usuário ou email já existe." });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const queryText = 'INSERT INTO usuario (usr, email, senha) VALUES ($1, $2, $3) RETURNING *';
        const result = await pool.query(queryText, [usr, email, hashedPassword]);

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use(session({
    secret: 'seu_segredo_aqui',  
    resave: false,              
    saveUninitialized: true,     
    cookie: { secure: false }    
}));

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']; 

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, 'seu_segredo_aqui', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        req.id_usuario = decoded.id;

    
        console.log(`ID do usuário extraído do token: ${req.id_usuario}`);

        next();
    });
};

app.post('/pesquisar', async (req, res) => {
    const pesquisa = req.body.pesquisa;

    try {
        const query = `
            SELECT * 
            FROM musicas 
            WHERE titulo ILIKE $1
        `;
        const valores = [`%${pesquisa}%`];
        const resultado = await pool.query(query, valores);

        res.json({ musicas: resultado.rows });
    } catch (erro) {
        console.error('Erro ao consultar o banco de dados:', erro);
        res.status(500).send('Erro interno do servidor');
    }
});

app.post('/adicionar', async (req, res) => {
    const { id_playlist, nome_musica } = req.body;

    try {
        const query = `
            INSERT INTO playlist_musica (id_playlist, nome_musica) 
            VALUES ($1, $2)
        `;
        const valores = [id_playlist, nome_musica];

        await pool.query(query, valores);
        res.status(200).send('Música adicionada com sucesso!');
    } catch (erro) {
        console.error('Erro ao adicionar música à playlist:', erro);
        res.status(500).send('Erro interno do servidor');
    }
});


app.post('/playlist/musicas', async (req, res) => {
    const { id_playlist } = req.body;

    try {
        const query = `
            SELECT nome_musica 
            FROM playlist_musica 
            WHERE id_playlist = $1
        `;
        const valores = [id_playlist];
        const resultado = await pool.query(query, valores);

        res.json({ musicas: resultado.rows });
    } catch (erro) {
        console.error('Erro ao buscar músicas da playlist:', erro);
        res.status(500).send('Erro interno do servidor');
    }
});
  

app.post('/api/login', async (req, res) => {
    const { usr, senha } = req.body;

    if (!usr || !senha) {
        return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
    }

    try {
        const query = 'SELECT * FROM usuario WHERE usr = $1';
        const result = await pool.query(query, [usr]);

        if (result.rowCount === 0) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(senha, user.senha);

        if (!validPassword) {
            return res.status(400).json({ error: "Senha incorreta" });
        }

       
        console.log(`Id do nosso usuário: ${user.id}`)
        variavel_global_sessao = user.id;

        res.json({ message: "Login bem-sucedido" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/api/user', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: "Usuário não autenticado" });
    }
});

app.post('/criar-playlist', async (req, res) => {
    const { titulo } = req.body;  
    const userName = req.session.id;  

    console.log('Sessão atual:', req.session); 

    if (!titulo) {
        return res.status(400).json({ message: 'O título da playlist é obrigatório.' });
    }

    if (!userName) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    try {
        await pool.query(
            'INSERT INTO playlist (titulo , id_do_usuario) VALUES ($1,$2)',
            [titulo,variavel_global_sessao]
        );
        res.status(201).json({ message: 'Playlist criada com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar a playlist:', error);
        res.status(500).json({ message: 'Erro ao criar a playlist.' });
    }
});

app.set('view engine', 'ejs' ); 
app.set('views', path.join(__dirname, 'views')); 

app.get('/iniciologado', verificarToken, (req, res) => {
    res.render('iniciologado', { usuario: req.id_usuario });
});

var nomeUsuarioGlobal = '';

app.all('/puxar', async (req, res) => {
    if (req.method === 'POST') {
        const nomeUsuario = req.body.usuario;

        if (!nomeUsuario) {
            return res.status(400).json({ error: 'Usuário não fornecido no POST' });
        }

       
        nomeUsuarioGlobal = nomeUsuario;
        console.log(`Usuário salvo na variável global: ${nomeUsuarioGlobal}`);

        return res.json({ message: 'Usuário salvo na variável global com sucesso' });
    }

    if (req.method === 'GET') {
       
        const id = nomeUsuarioGlobal

        try {
            const query = "SELECT * FROM playlist WHERE id_do_usuario = $1";
            const result = await pool.query(query, [variavel_global_sessao]);

            console.log(result.rows)

            if (result.rows.length > 0) {
                res.json(result.rows);  
            } else {
                res.status(404).json({ error: 'Nenhuma playlist encontrada' });
            }
        } catch (error) {
            console.error("Erro ao buscar playlist:", error);
            res.status(500).json({ error: 'Erro ao buscar playlist' });
        }
    };
});


app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao fazer logout" });
        }
        res.clearCookie('connect.sid');
        res.json({ message: "Logout realizado com sucesso" });
    });
});

app.use('/Spotifly', express.static(path.join('C:', 'Users', 'USUARIO', 'Desktop', 'Conexao DB', 'Spotifly')));

app.get('/', (req, res) => {
    res.sendFile(path.join('C:', 'Users', 'USUARIO', 'Desktop', 'Conexao DB', 'Spotifly', 'html', 'inicio.html'));
});

app.get('/musica-aleatoria', async (req, res) => {
    try {
        const result = await pool.query("SELECT imagem_url, titulo, artista FROM musicas ORDER BY RANDOM() LIMIT 1");
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Nenhuma música encontrada' });
        }
    } catch (error) {
        console.error("Erro ao buscar música:", error);
        res.status(500).json({ error: 'Erro ao buscar música' });
    }
});

process.on('SIGINT', async () => {
    console.log('Encerrando a conexão com o banco de dados...');
    await pool.end();
    console.log('Conexão encerrada.');
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});