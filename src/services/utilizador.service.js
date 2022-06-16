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

export const UtilizadorService = {
    // sends request to API root
    async getPublicContent() {
        const response = await fetch(`${API_URL}`, {
            method: "GET" // requires NO authorization header
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else
            throw Error(handleResponses(response.status));
    },

    async fetchOneUtilizadorByID(id) {
        const response = await fetch(`${API_URL}/utilizadores/${id}`, {
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

    async fetchAllUtilizadores() {
        const response = await fetch(`${API_URL}/utilizadores`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            return data.utilizadores;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async eliminarUtilizador(id) {
        const response = await fetch(`${API_URL}/utilizadores/${id}`, {
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

    async updateUtilizador(id, utilizador) {
        const response = await fetch(`${API_URL}/utilizadores/${id}`, {
            method: "PACTH",
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify({
                    foto: utilizador.foto,
                    palavra_passe: utilizador.palavra_passe,
                    tipo: utilizador.tipo
                })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async addFavoritos(id, filmeID) {
        const response = await fetch(`${API_URL}/utilizadores/${id}/favoritos/${filmeID}`, {
            method: "POST",
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

    async addLista(id, filmeID) {
        const response = await fetch(`${API_URL}/utilizadores/${id}/lista/${filmeID}`, {
            method: "POST",
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

    async addDesafio(id, jogoID) {
        const response = await fetch(`${API_URL}/utilizadores/${id}/desafios/${jogoID}`, {
            method: "POST",
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

    async addDesafioConcluido(id, desafioID) {
        const response = await fetch(`${API_URL}/utilizadores/${id}/desafioConcluido/${desafioID}`, {
            method: "POST",
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
}

export default UtilizadorService;

function handleResponses(code) {
    let message = "";
    switch (code) {
        case 401:
            message = "Não é permitido executar esta ação!";
            break;
        case 403:
            message = "Acesso proibido";
            break;
        default:
            message = "Mensagem desconhecida";
            break;
    }
    return message;
}