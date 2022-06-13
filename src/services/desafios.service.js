import API_URL from './config.js'

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
        });
        if (response.ok) {
            let data = await response.json();
            return data.desafios;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async adicionarDesafio(desafio) {
        const response = await fetch(`${API_URL}/desafios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify({
                    nome: desafio.nome,
                    nEtapas: desafio.nEtapas,
                    imagem: desafio.imagem
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