import API_URL from './config.js'

function filmeHeader() {
    // verifica o armazenamento local para o item do Filme
    let filme = JSON.parse(localStorage.getItem('filme'));

    // if there is a logged user with accessToken (JWT)
    if (filme) {
        // return HTTP authorization header for Node.js Express back-end
        return {
            'Content-Type': 'application/json',
        };
    } else  //otherwise, return just header for content type
        return { 'Content-Type': 'application/json' };
}

export const FilmeService = {
    async fetchOneFilmeByID(id) {
        const response = await fetch(`${API_URL}/filmes/${id}`, {
            method: "GET",
            headers: filmeHeader()
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchAllFilmes() {
        const response = await fetch(`${API_URL}/filmes`, {
            method: "GET",
            headers: filmeHeader()
        });
        if (response.ok) {
            let data = await response.json();
            return data.filme;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async adicionarFilme(filme) {
        const response = await fetch(`${API_URL}/filmes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify({
                    nome: filme.nome,
                    imagem: filme.imagem,
                    trailer: filme.trailer,
                    tipo: filme.tipo,
                    categoria: filme.categoria,
                    ano: filme.ano,
                    realizador: filme.realizador,
                    produtora: filme.produtora,
                    elenco: filme.elenco,
                    sinopse: filme.sinopse,
                    classificacao: filme.classificacao
                })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async eliminarFilme(id) {
        const response = await fetch(`${API_URL}/filmes/${id}`, {
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

    async addComentario(id, comentario) {
        const response = await fetch(`${API_URL}/filmes/${id}/comentarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify({
                    utilizador: comentario.utilizadorID,
                    comentario: comentario.comentario
                })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async updateComentario(filmeID, comentarioID ,comentario) {
        const response = await fetch(`${API_URL}/filmes/${filmeID}/comentarios/${comentarioID}`, {
            method: "PACTH",
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify({
                    spoiler: comentario.spoiler,
                })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async updateAvaliacao(id, avaliacao) {
        const response = await fetch(`${API_URL}/filmes/${id}/avaliacao`, {
            method: "PACTH",
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify({
                    avaliacao: avaliacao.avaliacao,
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

export default FilmeService;

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