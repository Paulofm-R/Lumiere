import API_URL from './config.js'

function authHeader() {
    // checks Local Storage for user item
    let utilizador = JSON.parse(localStorage.getItem('utilizador'));

    // if there is a logged user with accessToken (JWT)
    if (utilizador && utilizador.accessToken) {
        // return HTTP authorization header for Node.js Express back-end
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + utilizador.accessToken
        };
    } else  //otherwise, return just header for content type
        return { 'Content-Type': 'application/json' };
}

export const JogoService = {
    async fetchOneJogosByID(id) {
        const response = await fetch(`${API_URL}/jogos/${id}`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchAllJogos() {
        const response = await fetch(`${API_URL}/jogos`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            return data.jogo;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async adicionarJogo(jogo) {
        const response = await fetch(`${API_URL}/jogos`, {
            method: "POST",
            headers: authHeader(),
            body:
                JSON.stringify({
                    nome: jogo.nome,
                    img: jogo.img,
                    tipo: jogo.tipo,
                    perguntas: jogo.perguntas
                })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async eliminarJogo(id) {
        const response = await fetch(`${API_URL}/jogos/${id}`, {
            method: "DELETE",
            headers: authHeader(),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchAllClassificacoes(id) {
        const response = await fetch(`${API_URL}/jogos/${id}/classificacao`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            return data.jogo;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async addClassificacao(id, jogo) {
        const response = await fetch(`${API_URL}/filmes/${id}/classificacao`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify({
                    utilizador: jogo.utilizadorID,
                    classificacao: jogo.classificacao
                })
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    }
}

export default JogoService;

function handleResponses(code) {
    let message = "";
    switch (code) {
        case 401:
            message = "Não é permitido executar esta ação!";
            break;
        case 403:
            message = "Acesso proibido";
            break;
        case 404:
            message = "Objeto não encontrado"
            break;
        default:
            message = "Mensagem desconhecida";
            break;
    }
    return message;
}