<template>
    <div>
        <h1>{{jogo.nome}}</h1>
        <h2 v-if="numPerguntas > 0">{{certas}} respostas certas em {{numPerguntas}} </h2>

        <h3>Tabela de Classificação</h3>
        <table>
            <thead>
                <tr>
                    <th>POSIÇÃO</th>
                    <th class="nome">NOME</th>
                    <th>PONTUAÇÃO</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(utilizador, index) in classificacao" :key="index">
                    <td class="posicao">{{index + 1}}</td>
                    <td class="nome"><img :src="imagemUtilizador(utilizador.utilizador)" class='img'> {{utilizador.utilizador}}</td>
                    <td class="pontuacao">{{utilizador.pontuacao}}pts</td>
                </tr>
            </tbody>
            <tfoot></tfoot>
        </table>
    </div>
</template>

<script>
    import { mapGetters} from 'vuex';

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
            ...mapGetters(['getUtilizadores']),

            classificacao() {
                let top5 = this.jogo.classificacao.slice(0).sort(this.ordenarClassificacao);
                return top5.slice(0, 5);
            }
        },

        methods: {
            ordenarClassificacao(utilizadorA, utilizadorB) {
                if (utilizadorA.pontuacao < utilizadorB.pontuacao) return 1;
                else if (utilizadorA.pontuacao > utilizadorB.pontuacao) return -1;
                else return 0;
            },

            imagemUtilizador(nome){
                let utilizador = this.getUtilizadores.find((utilizador) => utilizador.nome == nome)
                console.log(utilizador);
                if(utilizador == undefined){
                    return '../assets/img/User.svg'
                }
                else{
                    return utilizador.foto
                }
            }
        },
    }
</script>

<style scoped>
h1,
h2,
h3{
    margin-top: 5vh;
    text-align: center;
    font-family: var(--font2);
}

table {
    margin: auto;
    height: 45vh;
    width: 45vw;
    color: white;
    border-collapse: collapse;
    font-family: var(--font1);
}

thead > tr > th {
    text-align: center;
    font-size: 1.75em;
    font-family: var(--font2);
    color: var(--cor3);
}

thead > tr > th.nome {
    padding-left: 25px;
}

tbody > tr > td {
    padding: 10px;
    padding-left: 25px;
    text-align: center;
}

tbody > tr > td.posicao {
    font-family: var(--font2);
    font-size: 1.5em;
}

tbody > tr > td.nome {
    font-family: var(--font2);
    font-size: 1.25em;
}

tbody > tr > td.nome > .img{
  width: 50px;
  height: 50px;
  border-radius: 90%;
}

.nome{
    text-align: left;
}

caption{
    font-size:1.5em;
    font-weight: bold;
    padding: 10px;
    background-color: lightgray;
}
</style>