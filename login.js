document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usr = document.getElementById('usr').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usr, senha })
        });

        const result = await response.json();

        const messageEl = document.getElementById('message');
        if (result.success) {
            messageEl.textContent = result.message;
            // Redirecionar ou executar alguma ação adicional
        } else {
            messageEl.textContent = 'Usuário ou senha inválidos';
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
});

document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usr = document.getElementById('usr').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usr, email, senha })
        });

        const result = await response.json();

        const messageEl = document.getElementById('message');
        if (response.ok) {
            messageEl.textContent = 'Usuário cadastrado com sucesso! Faça login.';
        } else {
            messageEl.textContent = result.error || 'Erro ao cadastrar o usuário';
        }
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
    }
});

function paginaInicial(){
    window.location = 'inicio.html'
}
