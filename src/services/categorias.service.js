import API_URL from './config.js'

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