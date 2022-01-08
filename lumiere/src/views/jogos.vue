<template>
    <div>
        <b-container fluid>
            <h1>JOGOS</h1>
            <b-row align-h="between">
                <b-col cols=4 id="filtro">
                    <select name="filtroJogos" id="filtroJogos">
                        <option value="" default disabled>Filtrar por...</option>
                    </select>
                </b-col>
                <b-col v-if="getLoggedUser.tipo == 'admin'" cols=4 id="adminAcoes">
                    <button v-if="!acaoAdmin" @click="acaoAdmin = true">Editar</button>
                    <button v-else v-b-modal="'adicionarModal'">Adicionar</button>
                </b-col>
            </b-row>
            <b-row id="catalogoJogos">
                <b-col cols=3 class="catalogoJogo" v-for="(jogo, index) in getJogos" :key="index">
                    <div class="card jogo" @click='selecionarJogo(jogo.nome)'>
                        <button @click="removerJogo(jogo.nome)" v-if="acaoAdmin" class="remover" :id="jogo.nome">X</button>
                        <img :src="jogo.img">
                        <div class="nomeJogo">
                            <h4>{{jogo.nome}}</h4>
                        </div>
                        <!-- <input type="image" src="" alt=""> -->
                    </div>
                </b-col>
            </b-row>

            <!-- Modais -->
            <!-- Modal para criar um jogo novo -->
            <b-modal id="adicionarModal" centered
                header-bg-variant="info"
                body-bg-variant="light"
                footer-bg-variant="light">
                <template #modal-header="{close}">
                    <b-col cols=11 class="modalTitulo" >
                        <h4>Adicionar Jogo</h4>
                    </b-col>
                    <b-col style="text-align: right">
                        <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                    </b-col>
                </template>
                <template>
                    <b-row>
                        <b-col cols="4">
                            <b-button v-if="form.imagem.length == 0" variant="outline-secondary" id="novoFoto" v-b-modal="'fotoModal'" >Foto Jogo <br>+</b-button>
                            <input v-else type="image" :src="form.imagem" alt="Foto do Jogo" v-b-modal="'fotoModal'" width="100%">
                        </b-col>
                        <b-col cols="8">
                            <b-form @submit.prevent="addJogo">   
                                <div class="form-group">
                                    <label for="txtNome">Nome</label>
                                    <input type="text"
                                    class="form-control" name="txtNome" id="txtNome" placeholder="Nome do Jogo" v-model="form.nome" required>
                                </div>
                                <div class="form-group">
                                    <label for="selectTipoJogo">Tipo de Jogo</label>
                                    <select class="form-control" name="selectTipoJogo" id="selectTipoJogo" v-model="form.tipo" required>
                                    <option value="" disabled>--Selecione o tipo de jogo--</option>
                                    <option v-for="(tipo, index) in getTipoJogo" :key="index" :value="tipo">{{tipo}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="txtNome">Questões</label>
                                    <input type="button" class="form-control" name="numQuestao" id="numQuestao" value="Inserir as questoes" v-b-modal="'questoesJogo'">
                                </div>
                                <div class="form-group">
                                    <label for="txtAnexos">Anexos</label>
                                    <input type="url" class="form-control" name="txtAnexos" id="txtAnexos" placeholder="Separadas por virgula" v-model="form.anexos">
                                </div>
                            </b-form>
                        </b-col>
                        
                    </b-row>
                    <b-row class="justify-content-md-center" id="rowJogoExiste">
                        <b-col cols="5">
                            <b-alert v-if="jogoExiste" show variant="danger">Esse jogo já existe</b-alert>
                        </b-col> 
                    </b-row>
                </template>
                <template #modal-footer>
                    <div id="botaoAdicionar">
                        <b-button variant="primary" @click="addJogo()">ADICIONAR</b-button>
                    </div>
                </template>
            </b-modal> 

            <!-- Modal para adicionar uma imagem -->
            <b-modal id="fotoModal" centered
                header-bg-variant="info"
                body-bg-variant="light"
                footer-bg-variant="light" 
                ok-only>
                <template #modal-header="{close}">
                    <b-col cols=11 class="modalTitulo" >
                        <h4>Foto do jogo</h4>
                    </b-col>
                    <b-col style="text-align: right">
                        <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                    </b-col>
                </template>
                <template>
                    <label for="urlFotoJogo">URL da imagem</label>
                    <b-form-input v-model="form.imagem" id="urlFotoJogo" type="url"></b-form-input>
                    <!-- <b-form-file v-modal="form.imagem" class="mt-3" plain></b-form-file> -->
                </template>
                <template #modal-footer="{close}">
                    <b-button variant="primary" @click="close">Guardar</b-button>
                </template>
            </b-modal> 

            <!-- Modal para inserir as perguntas -->
            <b-modal id="questoesJogo" centered
                header-bg-variant="info"
                body-bg-variant="light"
                footer-bg-variant="light"
                scrollable 
                ok-only>
                <template #modal-header="{close}">
                    <b-col cols=11 class="modalTitulo" >
                        <h4>Questões</h4>
                    </b-col>
                    <b-col style="text-align: right">
                        <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                    </b-col>
                </template>
                <template>
                    <b-form v-if="form.tipo == 'quizz'">
                        <div class="mb-3" v-for="(questao, index) in form.questoes" :key="index">
                            <b-form-group :label="`${index+1}ª Pergunta:`" label-for="pergunta">
                                <b-form-input class="pergunta" placeholder="Pergunta" v-model="questao.pergunta" required></b-form-input>
                            </b-form-group>
                            <b-row align-h="between" class="mt-2">
                                <b-col class="alternativas" cols="6" v-for="(alternativa, index2) in questao.alternativas" :key="index2">
                                    <b-form-group class="alternativa" :label="`Alternativa ${index2+1}:`" :label-for="`${index2}`" v-slot="{ ariaDescribedby }">
                                        <b-form-radio class="radionAlternativas" :name="`respostaPergunta${index}`" :aria-describedby="ariaDescribedby" :value="questao.alternativas[index2]" v-model="questao.resposta" ></b-form-radio>
                                        <b-form-input :id="`${index2}`" :placeholder="`Alternativa ${index2+1}`" v-model="questao.alternativas[index2]" required></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <hr v-if="index + 1 < form.questoes.length"> <!-- Colocar uma linha cada vez que tenha uma questão a seguir -->
                        </div>   
                    </b-form>
                </template>
                <template #modal-footer="{close}">
                    <b-button variant="primary" @click="addQuestao()">+</b-button>
                    <b-button variant="primary" @click="close">Guardar</b-button>
                </template>
            </b-modal> 
        </b-container> 
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: "Jogos",
        
        data() {
            return {
                acaoAdmin: false,
                jogoExiste: false,
                form: {
                    nome: '',
                    imagem: '',
                    tipo: '',
                    questoes: [{
                        pergunta: '',
                        alternativas: ['', '', '', ''],
                        resposta: '',
                    }],
                    anexos: '',
                },
            }
        },

        computed: {
            ...mapGetters(['getJogos', 'getTipoJogo', 'isNomeJogoAvalido', 'getLoggedUser']),
        },

        methods: {
            ...mapMutations(['SET_REMOVER_JOGO', 'SET_NOVO_JOGO']),

            removerJogo(nome){
                if(confirm("Tens acerteza que queres remover este jogo?")){
                    this.SET_REMOVER_JOGO(nome);
                }
            },

            addJogo(){
                if(this.isNomeJogoAvalido(this.form.nome)){
                    let novoJogo = {
                        nome: this.form.nome,
                        img: this.form.imagem,
                        tipo: this.form.tipo,
                        perguntas: this.form.questoes,
                    }
                    
                    this.SET_NOVO_JOGO(novoJogo);
                    this.$router.push({ name: "jogo", params:{ jogoNome: this.form.nome }} );
}
                else{
                    this.jogoExiste = true;
                }
            },

            selecionarJogo(nome){
                this.$router.push({ name: "jogo", params:{ jogoNome: nome }} );
            },

            addQuestao(){
                this.form.questoes.push({
                            pergunta: '',
                            alternativas: ['', '', '', ''],
                            resposta: '',
                            });
            }
        },
    }
</script>

<style scoped>
h1{
    margin-top: 20px;
    text-align: center;
    font-family: var(--font2);
    font-weight: bold;
}

#filtro{
    text-align: center;
}

#filtro > select{
    width: 50%;
}

#adminAcoes{
    text-align: center;
}

#adminAcoes > button{
    width: 150px;
    height: 35px;
    background-color: var(--cor2);
    font-family: var(--font1);
    font-size: 1.25em;
}

#catalogoJogos{
    margin: auto;
    margin-top: 2vh;
    margin-left: 10vw;
    margin-right: 10vw;    
}

.catalogoJogo > .jogo{
    margin: auto;
    margin-top: 5vh;
    border: 0px;
    height: 280px;
    width: 180px;
    background-color: var(--cor4);
    color: black;
    font-family: var(--font2);
}

.catalogoJogo > .jogo:hover{
    cursor: pointer;
    height: 285px; 
    width: 185px;
    font-size: 105%;
}

.catalogoJogo > .jogo > button{
    width: 18%;
    height: 12%;
    background-color: var(--cor2);
    position: absolute;
    right: -15px;
    top: -15px;
    border-radius: 25px;
    border-color: rgba(0, 0, 0, 0.884);
}

.catalogoJogo > .jogo > button:active{
    box-shadow: inset 5px 5px 13px 0px rgba(0, 0, 0, 0.479);
}

.catalogoJogo > .jogo > img{
    padding:0px;
    width: 100%;
    height: 85%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.500);
}


.catalogoJogo > .jogo > .nomeJogo{
    height: 15%;
    text-align: center;
}

.catalogoJogo > .jogo > .nomeJogo > h4{
    font-size: 110%;
}

.modalTitulo{
    text-align: center; 
    padding-left: 30px
}

.fecharModal{
    font-size: 2em;
    position: relative;
    top: -15px;
}

#novoFoto{
    height: 65%;
    width:75%;
    margin-top: 15%;
}

#rowJogoExiste{
    margin-top: 5%;
    margin-bottom: -5%;
}

#botaoAdicionar{
    margin: auto;
}

.alternativas{
    position: relative;
}

.radionAlternativas{
    position: absolute;
    right: 9px;
    top: 15px;
}
</style>