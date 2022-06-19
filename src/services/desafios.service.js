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

export const DesafioService = {
    async fetchOneDesafioByID(id) {
        const response = await fetch(`${API_URL}/desafios/${id}`, {
            method: "GET",
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchAllDesafios() {

        const response = await fetch(`${API_URL}/desafios`, {
            method: "GET",
            headers: authHeader()
        });

        if (response.ok) {
            let data = await response.json();
            return data.desafio;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async adicionarDesafio(desafio) {
        const response = await fetch(`${API_URL}/desafios`, {
            method: "POST",
            headers: authHeader(),
            body:
                JSON.stringify({
                    nome: desafio.nome,
                    nEtapas: desafio.nEtapas,
                    imagem: desafio.anexo
                })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },
}

export default DesafioService;

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