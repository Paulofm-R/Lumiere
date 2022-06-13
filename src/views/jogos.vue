<template>
    <div id="fundo">
        <b-container fluid>
            <h1>JOGOS</h1>
            <b-row align-h="between">
                <b-col cols=4 id="filtro">
                    <select name="filtroJogos" id="filtroJogos" v-model="filtroTipo">
                        <option value="" default disabled>Filtrar por...</option>
                        <option value="">TODOS</option>
                        <option v-for="(tipo, index) in getTipoJogo" :key="index" :value="tipo">{{tipo}}</option>
                    </select>
                </b-col>
                <b-col v-if="getLoggedUser.tipo == 'admin'" cols="4" id="adminAcoes">
                    <button v-if="!acaoAdmin" @click="acaoAdmin = true">Editar</button>
                    <button v-else v-b-modal="'adicionarJogoModal'">Adicionar</button>
                </b-col>
            </b-row>
            <b-row id="catalogoJogos">
                <b-col cols="3" class="catalogoJogo" v-for="(jogo, index) in filtroTipoJogo" :key="index">
                    <div class="card jogo" @click='selecionarJogo(jogo.nome)'>
                        <b-button @click="removerJogo(jogo.nome)" v-if="acaoAdmin" class="remover" :class="jogo.nome">X</b-button>
                        <b-icon icon="info-circle-fill" scale='1.5' variant="info" @click.stop="classificacao(jogo.nome)" class="classificacao" :class="jogo.nome"></b-icon>
                        <img :src="jogo.img">
                        <div class="nomeJogo">
                            <h4>{{jogo.nome}}</h4>
                        </div>
                    </div>
                </b-col>
            </b-row>

            <!-- Modais -->
            <!-- Modal para criar um jogo novo -->
            <b-modal ref="adicionarJogoModal" id="adicionarJogoModal" centered
                header-bg-variant="info"
                body-bg-variant="light"
                footer-bg-variant="light">
                <template #modal-header="{close}">
                    <b-col cols=11 class="modalTitulo" >
                        <h4>Adicionar Jogo</h4>
                    </b-col>
                    <b-col>
                        <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                    </b-col>
                </template>
                <template>
                    <b-row>
                        <b-col cols="4">
                            <b-button v-if="!imagemFilme" variant="outline-secondary" id="novoFoto" v-b-modal="'fotoModal'" >Foto Jogo <br>+</b-button>
                            <input v-else type="image" :src="form.imagem" alt="Foto do Jogo" v-b-modal="'fotoModal'" width="100%">
                        </b-col>
                        <b-col cols="8">
                            <b-form @submit.prevent="adicionaJogo">   
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
                                    <input type="button" class="form-control" name="numQuestao" id="numQuestao" value="Inserir as questoes" @click="questoesJogo">
                                </div>
                                <!-- <div class="form-group">
                                    <label for="txtAnexos">Anexos</label>
                                    <input type="url" class="form-control" name="txtAnexos" id="txtAnexos" placeholder="Separadas por virgula">
                                </div> -->
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
                        <b-button variant="primary" @click="adicionaJogo()">ADICIONAR</b-button>
                    </div>
                </template>
            </b-modal> 

            <!-- Modal para adicionar uma imagem -->
            <b-modal ref="fotoModal" id="fotoModal" centered
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
                <template #modal-footer>
                    <b-button variant="primary" @click="addImagem">Guardar</b-button>
                </template>
            </b-modal> 

            <!-- Modal para inserir as perguntas -->
            <b-modal ref="questoesJogo" id="questoesJogo" centered
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
                    <b-form v-if="form.tipo == 'Quizz'" class="quizz">
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

                    <b-form v-else-if="form.tipo == 'Preencher'" class="preencher">
                        <div class="mb-3" v-for="(questao, index) in form.questoes" :key="index">
                            <b-form-group :label="`${index+1}ª Pergunta:`" label-for="pergunta">
                                <b-form-input class="pergunta" placeholder="Pergunta" v-model="questao.pergunta" required></b-form-input>
                            </b-form-group>
                            <b-row>
                                <b-col>
                                    <b-form-group label="Anexo:" label-for="anexo">
                                        <b-form-input class="anexo" placeholder="Anexo" type="url" v-model="questao.anexo" required></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <select name="tipoAnexo" class="tipoAnexo" v-model="questao.tipoAnexo" required>
                                        <option value="" disabled>--Selecione um Tipo--</option>
                                        <option value="Imagem">Imagem</option>
                                        <option value="Video">Video</option>
                                    </select>
                                </b-col>
                            </b-row>
                            <b-form-group label="Resposta:" label-for="pergunta">
                                <b-form-input class="resposta" placeholder="Resposta" v-model="questao.resposta" required></b-form-input>
                            </b-form-group>
                            <hr v-if="index + 1 < form.questoes.length"> <!-- Colocar uma linha cada vez que tenha uma questão a seguir -->
                        </div>
                    </b-form>
                    
                    <h5 v-else>SELECIONE UM TIPO DE QUESTÃO PRIMEIRO!</h5>
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
        name: "PaginaJogos",
        
        data() {
            return {
                acaoAdmin: false,
                jogoExiste: false,
                form: {
                    nome: '',
                    imagem: '',
                    tipo: '',
                    questoes: [],
                },
                imagemFilme: false,
                filtroTipo: '',
            }
        },

        computed: {
            ...mapGetters(['getJogos', 'getTipoJogo', 'isNomeJogoAvalido', 'getLoggedUser']),

            filtroTipoJogo(){
                return this.getJogos.filter((jogo) => jogo.tipo == this.filtroTipo || this.filtroTipo == '')
            },
        },

        methods: {
            ...mapMutations(['SET_REMOVER_JOGO', 'SET_NOVO_JOGO', 'SET_JOGO']),

            removerJogo(nome){
                if(confirm("Tens acerteza que queres remover este jogo?")){
                    this.SET_REMOVER_JOGO(nome);
                }
            },

            classificacao(nome){
                this.$router.push({ name: "classificacao", params:{ jogoNome: nome}} )
            },

            adicionaJogo(){
                let confirmarNovoJogo = true;
                
                for (let i in this.form){
                    if(this.form[i].length === 0){
                        confirmarNovoJogo = false;
                        break;
                    }
                }
                
                if(confirmarNovoJogo){
                    if(this.isNomeJogoAvalido(this.form.nome)){
                        if(this.form.tipo == 'Preencher'){
                            for (let i = 0; i < this.form.questoes.length; i++){
                                if (this.form.questoes[i].tipoAnexo == "Video"){
                                    this.form.questoes[i].anexo = this.form.questoes[i].anexo.replace('watch?v=', 'embed/');
                                }
                            }
                        }
                        let novoJogo = {
                            nome: this.form.nome,
                            img: this.form.imagem,
                            tipo: this.form.tipo,
                            perguntas: this.form.questoes,
                            classificacao: [],
                        }
                        
                        this.SET_NOVO_JOGO(novoJogo);
                        this.$router.push({ name: "jogo", params:{ jogoNome: this.form.nome }} );
    }
                    else{
                        this.jogoExiste = true;
                    }
                }
                else{
                    alert('Informação em falta ou invalida!')
                }
            },

            selecionarJogo(nome){
                this.SET_JOGO(nome)
                this.$router.push({ name: "jogo", params:{ jogoNome: nome }} );
            },

            addImagem(){
                if(this.form.imagem.length > 0){
                    this.imagemFilme = true;
                    this.$refs['fotoModal'].hide()
                }
            },

            questoesJogo(){
                if(this.form.questoes.length === 0){
                    this.addQuestao();
                }

                this.$refs['questoesJogo'].show();
            },

            addQuestao(){
                if(this.form.tipo == 'Quizz'){
                    this.form.questoes.push({
                            pergunta: '',
                            alternativas: ['', '', '', ''],
                            resposta: '',
                            });
                }
                else if (this.form.tipo == 'Preencher'){
                    this.form.questoes.push({
                        pergunta: '',
                        anexo: '',
                        tipoAnexo: '',
                        resposta: '',
                    })
                }
                
            },
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

.catalogoJogo > .jogo > .remover{
    width: 18%;
    height: 12%;
    background-color: var(--cor2);
    position: absolute;
    right: -15px;
    top: -15px;
    border-radius: 25px;
    border-color: rgba(0, 0, 0, 0.884);
    color: black;
    padding: 0;
}

.catalogoJogo > .jogo > .remover:hover{
    opacity: 90%;
}

.catalogoJogo > .jogo > .remover:active{
    box-shadow: inset 5px 5px 13px 0px rgba(0, 0, 0, 0.479);
}

.catalogoJogo > .jogo > .classificacao{
    position: absolute;
    right: 5px;
    bottom: 5px;
    border-radius: 25px;
    border-color: rgba(0, 0, 0, 0.884);
    color: black;
    padding: 0;
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
    height: 85%;
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

.anexo{
    width: 125%;
}

.tipoAnexo{
    margin-top: 24px;
    margin-left: 20%;
    height: 36px;
    width: 80%;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}

#fundo{
    background-image: url('../assets/img/fundo_jogos.svg');
    min-height: 60vh;
}
</style>