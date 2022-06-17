<template>
    <div class="body">
        <h1>{{ jogo.nome }}</h1>
        <h2 v-if="numPerguntas > 0">{{ certas }} respostas certas em {{ numPerguntas }} </h2>

        <h3>Tabela de Classificação</h3>
        <table v-if="classificacao.length > 0">
            <thead>
                <tr>
                    <th>POSIÇÃO</th>
                    <th class="nome">NOME</th>
                    <th>PONTUAÇÃO</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(utilizador, index) in classificacao" :key="index">
                    <td class="posicao">{{ index + 1 }}</td>
                    <td class="nome"><img :src="utilizadores(utilizador.utilizador).foto" class='img'>
                        {{ utilizadores(utilizador.utilizador).nome }}</td>
                    <td class="pontuacao">{{ utilizador.pontuacao }}pts</td>
                </tr>
            </tbody>
        </table>
        <div v-else id="tabelaSemClassificacao">
            <p>Ainda não tem nenhuma classificação</p>
            <p>Seja o primeiro a jogar e ter a sua classificacao aqui</p>
            <b-button id="botaoJogar" @click="jogar()">Jogar</b-button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: "ClassificacaoJogo",
    data() {
        return {
            jogo: {},
            certas: 0,
        }
    },

    created() {
        // this.jogo = JSON.parse(localStorage.getItem('jogos')).find((jogo) => jogo.nome == this.$route.params.jogoNome);
        this.jogo = this.getJogos.find((jogo) => jogo.nome == this.$route.params.jogoNome);
        this.certas = this.$route.params.certas;
        this.numPerguntas = this.$route.params.numPerguntas;
    },

    computed: {
        ...mapGetters(['getUtilizadores', 'getJogos', 'getJogo']),

        classificacao() {
            let top5 = this.jogo.classificacao.slice(0).sort(this.ordenarClassificacao);
            return top5.slice(0, 5);
        }
    },

    methods: {
        ...mapMutations(['SET_JOGO_ATUAL']),

        async getJogoClassificacao() {
            try {
                await this.$store.dispatch("getClassificacao", this.$route.params.jogoID);
                this.jogo = await this.getJogo;
                console.log(this.jogo);
            } catch (error) {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        },

        ordenarClassificacao(utilizadorA, utilizadorB) {
            if (utilizadorA.pontuacao < utilizadorB.pontuacao) return 1;
            else if (utilizadorA.pontuacao > utilizadorB.pontuacao) return -1;
            else return 0;
        },

        async utilizadores(id) {
            try {
                await this.$store.dispatch("getUtilizador", id);
                console.log(utilizador);
                return utilizador;
            }
            catch (error) {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        },

        jogar() {
            this.SET_JOGO_ATUAL(this.jogo.nome)
            this.$router.push({ name: "jogo", params: { jogoNome: this.jogo.nome } });
        }
    },

    mounted() {
        this.getJogoClassificacao();
    },
}
</script>

<style scoped>
.body {
    min-height: 60vh;
}

h1,
h2,
h3 {
    margin-top: 5vh;
    text-align: center;
    font-family: var(--font2);
}

table {
    margin: auto;
    max-height: 45vh;
    width: 45vw;
    color: white;
    border-collapse: collapse;
    font-family: var(--font1);
}

thead>tr>th {
    text-align: center;
    font-size: 1.75em;
    font-family: var(--font2);
    color: var(--cor3);
}

thead>tr>th.nome {
    padding-left: 25px;
}

tbody>tr>td {
    padding: 10px;
    padding-left: 25px;
    text-align: center;
}

tbody>tr>td.posicao {
    font-family: var(--font2);
    font-size: 1.5em;
}

tbody>tr>td.nome {
    font-family: var(--font2);
    font-size: 1.25em;
}

tbody>tr>td.nome>.img {
    width: 50px;
    height: 50px;
    border-radius: 90%;
}

.nome {
    text-align: left;
}

td.posicao:nth-of-type(1) {
    font-size: 2em;
    font-family: var(--font2);
}

#tabelaSemClassificacao {
    margin-top: 6vh;
    text-align: center;
    font-family: var(--font1);
    font-size: 18px;
}

#tabelaSemClassificacao #botaoJogar {
    width: 100px;
    height: 45px;
    background-color: var(--cor2);
}

#tabelaSemClassificacao #botaoJogar:active {
    opacity: 90%;
}
</style>