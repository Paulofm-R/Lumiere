import API_URL from './config.js'

function authHeader() {
    // checks Local Storage for user item
    let utilizador = JSON.parse(localStorage.getItem('utilizadores'));

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
            // console.log("USER SERVICE - fetch WELCOMING MESSAGE")
            // console.log(data) // data = "Welcome to the TUTORIALS api"
            return data;
        }
        else
            throw Error(handleResponses(response.status));
    },

    async fetchOneUserByID(id) {
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

    async fetchAllUsers() {
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