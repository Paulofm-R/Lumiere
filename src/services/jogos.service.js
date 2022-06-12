import API_URL from './config.js'

function jogoHeader() {
    // verifica o armazenamento local para o item do Jogo
    let jogo = JSON.parse(localStorage.getItem('jogo'));

    // if there is a logged user with accessToken (JWT)
    if (jogo) {
        // return HTTP authorization header for Node.js Express back-end
        return {
            'Content-Type': 'application/json',
        };
    } else  //otherwise, return just header for content type
        return { 'Content-Type': 'application/json' };
}

export const JogoService = {
    async fetchOneFilmeByID(id) {
        const response = await fetch(`${API_URL}/jogos/${id}`, {
            method: "GET",
            headers: jogoHeader()
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
        });
        if (response.ok) {
            let data = await response.json();
            return data.jogos;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async adicionarFilme(jogo) {
        const response = await fetch(`${API_URL}/jogos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
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
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchAllClassificacoes() {
        const response = await fetch(`${API_URL}/jogos/classificacao`, {
            method: "GET",
        });
        if (response.ok) {
            let data = await response.json();
            return data.jogos.classificacao;
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