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

export const CategoriaService = {
    async fetchAllCategorias() {
        const response = await fetch(`${API_URL}/categorias`, {
            method: "GET",
        });
        if (response.ok) {
            let data = await response.json();
            return data.categorias;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async adicionarCategoria(categoria) {
        const response = await fetch(`${API_URL}/categorias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify({
                    categoria: categoria.categoria
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

export default CategoriaService;

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