import API_URL from './config.js'

export const AuthService = {
    async login(utilizador) { // payload = user (username + password)
        const response = await fetch(`${API_URL}/login`, {
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
                    palavra_passe: utilizador.password,
                    foto:'',
                    tipo:'utilizador',
                    favoritos:[],
                    lista:[],
                    numJogos:0,
                    desafios:[],
                    desafiosConcluidos:[]
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
            message = "Username already exists.";
            break;
        case 401:
            message = "Wrong credentials";
            break;
        case 404:
            message = "User not found";
            break;
        case 500:
            message = "Internal server error";
            break;
        default:
            message = "Unkown message";
            break;
    }
    return message;
}

export default AuthService;