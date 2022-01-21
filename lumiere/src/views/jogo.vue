<template>
    <div>
        <b-container>
            <h1>{{jogo.nome}}</h1>
            <div v-if="jogo.tipo == 'Quizz'">
                <div class="jogo quizz" v-for="(jogo, index) in jogo.perguntas" :key="index">
                    <b-row align-h="center" >
                        <b-col cols="10" class="pergunta">
                            <p>{{jogo.pergunta}}</p>
                        </b-col>
                    </b-row>
                    <b-row align-h="around">
                        <b-col class="alternativas" cols='4' v-for="(alternativa, ind) in jogo.alternativas" :key="ind">
                            <b-button variant="outline-dark" class='botao botaoJogo' :class="selecionadasQuizz[index] == alternativa ? 'selecionada': 'naoSelecionada'" @click='selecionar(alternativa, index)'>{{alternativa}}</b-button>
                        </b-col>
                    </b-row>
                </div>
                
            </div>
            <div v-if="jogo.tipo == 'Preencher'" class='preencher'>
                <div class="jogo" v-for="(jogo, index) in jogo.perguntas" :key="index">
                    <h2>{{jogo.pergunta}}</h2>
                    <div>
                        <img v-if="jogo.tipoAnexo == 'Imagem'" :src="jogo.anexo" height="350" class="anexoJogo">
                        <iframe v-else width="560" height="315" :src="jogo.anexo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="anexoJogo"></iframe>
                    </div>
                    <div>
                        <b-form-input class="respostas" v-model="selecionadasQuizz[index]" placeholder="Sua resposta" required></b-form-input>
                    </div>
                    
                </div>
            </div>

            <b-row>
                <b-button class="botao" id="terminarQuizz" @click="terminar(jogo.nome)">TERMINAR QUIZZ</b-button>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

    export default {
        name: 'Jogo',
        data() {
            return {
                jogo: {},
                selecionadasQuizz: [],
                certas: 0,
            }
        },

        computed: {
            ...mapGetters(['getLoggedUser']),
        },

        methods: {
            ...mapMutations(['SET_NOVA_CLASSIFICACAO']),

            selecionar(alternativa, index){
                this.selecionadasQuizz[index] = alternativa
                this.$forceUpdate()
            },

            terminar(nome){
                for(let i = 0; i < this.jogo.perguntas.length; i++){
                    if(this.jogo.perguntas[i].resposta == this.selecionadasQuizz[i]){
                        this.certas++
                    }
                }
                const pontuacao = this.certas * 25;
                const novaClassificacao = {
                    utilizador: this.getLoggedUser.nome,
                    pontuacao: pontuacao,
                }
                
                let novo = [this.jogo.nome, novaClassificacao]
                this.SET_NOVA_CLASSIFICACAO(novo)
                console.log(this.jogo);
                this.$router.push({ name: "classificacao", params:{ jogoNome: nome, certas: this.certas, numPerguntas: this.jogo.perguntas.length }} );
            }
        },

        created () {
            this.jogo = JSON.parse(localStorage.getItem('jogos')).find((jogo) => jogo.nome == this.$route.params.jogoNome);
        },
    }
</script>

<style scoped>
h1{
    margin-top: 5vh;
    margin-bottom: 5vh;
    text-align: center;
    font-family: var(--font2);
    font-size: 2.5em;
}

.preencher{
    margin: auto;
}

.preencher>.jogo{
    width: 75%;
    margin: auto;
    margin-bottom: 15vh;
    text-align: center;
}

.anexoJogo{
    margin: 5vh;
}

.respostas{
    margin: auto;
    width: 35%;
}

.jogo{
    margin-bottom: 7.5vh;
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
    height: 90%;
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