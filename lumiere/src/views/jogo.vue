<template>
    <div>
        <b-container>
            <h1>{{jogo.nome}}</h1>
            <div v-if="jogo.tipo == 'Quizz'">
                <div id="jogo" v-for="(jogo, index) in jogo.perguntas" :key="index">
                    <b-row align-h="center" >
                        <b-col cols="10" class="pergunta">
                            <p>{{jogo.pergunta}}</p>
                        </b-col>
                    </b-row>
                    <b-row align-h="around">
                        <b-col class="alternativas" cols='4' v-for="(alternativa, ind) in jogo.alternativas" :key="ind">
                            <b-button variant="outline-dark" class='botao' :class="selecionada[index] == alternativa ? 'selecionada': 'naoSelecionada'" @click='selecionar(alternativa, index)'>{{alternativa}}</b-button>
                        </b-col>
                    </b-row>
                </div>
                <b-row>
                    <b-button class="botao" id="terminarQuizz" @click="terminar(jogo.nome)">TERMINAR QUIZZ</b-button>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'Jogo',
        data() {
            return {
                jogo: {},
                selecionadasQuizz: [],
                certas: 0,
            }
        },

        methods: {
            selecionar(alternativa, index){
                this.selecionadasQuizz[index] = alternativa
            },

            terminar(nome){
                for(let i = 0; i < this.jogo.perguntas.length; i++){
                    if(this.jogo.perguntas[i].resposta == this.selecionadasQuizz[i]){
                        this.certas++
                    }
                }
                this.$router.push({ name: "classificacao", params:{ jogoNome: nome, certas: this.certas }} );
            }
        },

        created () {
            this.jogo = JSON.parse(localStorage.getItem('jogos')).find((jogo) => jogo.nome == this.$route.params.jogoNome);
        },
        computed: {
            selecionada() {
                console.log(this.selecionadasQuizz);
                return this.selecionadasQuizz;
            }
        },
    }
</script>

<style scoped>
h1{
    margin-top: 5vh;
    font-family: var(--font2);
    font-size: 2.5em;
}

.botao{
    border-color: var(--cor1);
    font-family: var(--font1);
    font-size: 1.25em;
    color: black;
}

.pergunta{
    margin: 3vh;
    height:100px;
    background-color: var(--cor4);
    text-align: center;
}

.pergunta > p{
    font-family: var(--font1);
    font-size: 1.5em;
    color: black;
    padding-top:2.5%;
}

.alternativas{
    margin: 2vh;
    height: 100px;
    text-align: center;
}

.alternativas > .botao{
    height:100%;
    width: 100%;
}

.alternativas > .naoSelecionada{
    background-color: var(--cor4);
}

.alternativas > .naoSelecionada:hover{
    background-color: var(--cor3);
}

.alternativas > .selecionada{
    background-color: var(--cor3);
}

.alternativas > button:active{
    background-color: var(--cor3);
    box-shadow: inset 5px 5px 10px 0px rgba(0, 0, 0, 0.575);
}

#terminarQuizz{
    margin: auto;
    margin-top: 5vh;
    background-color: var(--cor3);
    height: 100px;
    width: 25vw;
}

#terminarQuizz:active{
    box-shadow: inset 5px 5px 10px 0px rgba(0, 0, 0, 0.575);
}
</style>