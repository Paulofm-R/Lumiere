import API_URL from './config.js'

export const AutenticadoService = {
    async login(utilizador) { // payload = utilizador (nome + palavra-passe)
        const response = await fetch(`${API_URL}/utilizadores/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                utilizador: utilizador.nome,
                palavra_passe: utilizador.palavra_passe
            })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.accessToken)
                localStorage.setItem('utilizador', JSON.stringify(data));
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async logout() {
        localStorage.removeItem('utilizador');
    },

    async register(utilizador) {
        const response = await fetch(`${API_URL}/utilizadores`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify({
                    nome: utilizador.nome,
                    palavra_passe: utilizador.palavra_passe,
                    data_nascimento: utilizador.data_nascimento
                })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    }
}

function handleResponses(code) {
    let message = "";
    switch (code) {
        case 400:
            message = "O nome de utilizador já existe.";
            break;
        case 401:
            message = "Credenciais erradas";
            break;
        case 404:
            message = "Utilizador não encontrado";
            break;
        case 500:
            message = "Erro do Servidor Interno";
            break;
        default:
            message = "Mensagem desconhecida";
            break;
    }
    return message;
}

export default AutenticadoService;