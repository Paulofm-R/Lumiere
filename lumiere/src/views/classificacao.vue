<template>
    <div>
        <h1>{{jogo.nome}}</h1>
        <h2>{{certas}} respostas certas em {{numPerguntas}} </h2>
        <h2>Top 5 - classificação</h2>

        <table>
            <thead>
                <tr>
                    <th class="utilizador">Utilizadores</th>
                    <th class="pontuacao">Pontuação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(utilizador, index) in classificacao" :key="index">
                    <td class="utilizador">{{utilizador.utilizador}}</td>
                    <td class="pontuacao">{{utilizador.pontuacao}}pts</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    // import {mapGetters} from "vuex";

    export default {
        name: "classificacao",
        data() {
            return {
                jogo: {},
                certas: 0,
            }
        },

        created () {
            this.jogo = JSON.parse(localStorage.getItem('jogos')).find((jogo) => jogo.nome == this.$route.params.jogoNome);
            this.certas = this.$route.params.certas;
            this.numPerguntas = this.$route.params.numPerguntas;
        },

        computed: {
            classificacao() {
                console.log(this.jogo);
                return this.jogo.classificacao.slice(0, 5).sort(this.ordenarClassificacao)
            }
        },

        methods: {
            ordenarClassificacao(utilizadorA, utilizadorB) {
                if (utilizadorA.pontuacao < utilizadorB.pontuacao) return 1;
                else if (utilizadorA.pontuacao > utilizadorB.pontuacao) return -1;
                else return 0;
            }
        },
    }
</script>

<style scoped>
h1,
h2{
    margin-top: 5vh;
    text-align: center;
    font-family: var(--font2);
}

table {
    margin: auto;
    margin-top: 55px;
    height: 45vh;
    width: 45vw;
    background-color: var(--cor3);
    color: black;
    border-collapse: collapse;
    font-family: var(--font1);
}

.utilizador{
    border-right: 1px solid black;
}

thead > tr > th {
    width: 65%;
    border-bottom: 1px solid black;
    text-align: center;
    font-size: 1.75em;
}

tbody > tr{
    opacity: 85%;
}

tbody > tr:hover {
    opacity: 100%;
}


tbody > tr:nth-child(2n) {
    background-color: var(--cor4);
}

tbody > tr > td {
    padding: 10px;
    padding-left: 25px;
}

tbody > tr > td.utilizador {
    font-family: var(--font2);
    font-size: 1.5em;
}
</style>