<template>
    <div>
        <b-row class="imagemUtilizador">
            <img :src="getLoggedUser.foto" id="imgPerfil" />
            <b-button variant="warning" v-b-modal.editarPerfilModal id="editarPerfil" ><b-icon icon="pencil-square"></b-icon></b-button>
        </b-row>
        <b-row>
            <b-col id="utilizador" cols="4">
                <span id="nomeUtilizador">{{getLoggedUser.nome}}</span>
            </b-col>
        </b-row>
        <b-row>
            <div id='listasUtilizador'>
                <b-button variant="info" class="botoes" v-b-modal.listaFavoritos><b-icon icon="heart-fill"></b-icon>  Favoritos</b-button>
                <b-button variant="info" class="botoes" v-b-modal.listaMeusFilmes><b-icon icon="play-fill"></b-icon>  A minha lista</b-button>
                <b-button v-if="getLoggedUser.tipo == 'admin'" variant="info" class="botoes" v-b-modal.utilizadoresModal><b-icon icon="person-fill"></b-icon> Utilizadores</b-button>
            </div>
        </b-row>

        <b-row>
            <b-col cols="8">
                <span id="desafios">Desafios</span>
                <img src="../assets/img/vetor.svg" id="vetor1">
                <span id="badges">Badges</span>
                <img src="../assets/img/vetor.svg" id="vetor2">
            </b-col>
        </b-row>

        <b-row align-h="around">
            <b-col cols="6">
                <div id="divDesafios">
                    <b-button id="adicionarDesafio" v-if="getLoggedUser.tipo == 'admin'" v-b-modal.adicionarDesafio>ADICIONAR</b-button>
                    <div class='desafio' v-for="(desafio, index) in desafios" :key='index'>
                        <span>{{desafio.nome}}</span>
                        <b-progress :value="progressoDesafio" :max="desafio.nEtapas" show-value animated></b-progress>
                    </div>
                </div>
            </b-col>
            <b-col cols="6" >
                <div id="divBadges">
                    <div class='badge' v-for="(badge, index) in badges" :key='index'>
                        <div><img :src="badge.imagem" alt="" width="35px"></div>
                        <span>{{badge.nome}}</span>
                    </div>
                </div>
            </b-col>
        </b-row>

        <!-- Modais -->
        <!-- Modal de editar perfil -->
        <b-modal ref="editarPerfilModal" id="editarPerfilModal" centered
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light">
            <template #modal-header='{close}'>
                <h4 class="modalTitulo">Editar Perfil</h4>
                <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
            </template>
            <template>
                <div class="bodyModal">
                    <form @submit.prevent = "editarPerfil">
                        <div>
                            <div class='inputsEditarPerfil'>
                                <label for="urlFotoJogo">Nova Foto : </label>
                                <input type="url" width="40vw" height="30vh" v-model="form.imagemNova">
                            </div>
                            <div class='inputsEditarPerfil'>
                                <label for="novaPalavraPasse">Nova Palavra Passe : </label>
                                <input type="password" id="novaPalavraPasse" v-model="form.novaPalavraPasse">
                            </div>
                        </div>
                    </form>
                </div>
            </template>
            <template #modal-footer>
                <b-button @click='editarPerfil'>Aceitar Alterações</b-button>
            </template>
        </b-modal>

        <!-- Lista de Favoritos -->
        <b-modal id="listaFavoritos" centered
                size="lg"
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light"
                scrollable>
            <template #modal-header='{close}'>
                <h4 class='modalTitulo'>Favoritos</h4>
                <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
            </template>
            <template>
                <div v-if="getLoggedUser.favoritos.length > 0">
                    <img v-for="(favorito, index) in getLoggedUser.favoritos" :key="index" :src="favorito.imagem" alt="" width="150" class="imagemLista" @click='escolherFilme(favorito.nome)'>
                </div>
                <div v-else class="textoModal">
                    <p>Ainda não tens nenhum filme na tua lista de favoritos</p>
                    <p>Vai ao <router-link class="link" :to="{name: 'filmes'}">Catálolo</router-link> e adiciona o teu primeiro filme!</p>
                </div>
            </template>
            <template #modal-footer='{close}'>
                <b-button @click="close()">Fechar</b-button>
            </template>
        </b-modal> 

        <!-- Lista Meus Filmes -->
        <b-modal id="listaMeusFilmes" centered
                size="lg"
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light"
                scrollable>
            <template #modal-header='{close}'>
                <h4 class='modalTitulo'>Meus Filmes</h4>
                <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
            </template>
            <template>
                <div v-if="getLoggedUser.favoritos.length > 0">
                    <img v-for="(favorito, index) in getLoggedUser.lista" :key="index" :src="favorito.imagem" alt="" width="150" class="imagemLista" @click='escolherFilme(favorito.nome)'>
                </div>
                <div v-else class="textoModal">
                    <p>Ainda não tens nenhum filme na tua lista de filmes</p>
                    <p>Vai ao <router-link class="link" :to="{name: 'filmes'}">Catálolo</router-link> e adiciona o teu primeiro filme!</p>
                </div>
            </template>
            <template #modal-footer='{close}'>
                <b-button @click="close()">Fechar</b-button>
            </template>
        </b-modal>

        <!-- Gerir utilizadores -->
        <b-modal id="utilizadoresModal" centered
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light"
                scrollable>
            <template #modal-header='{close}'>
                <h4 class='modalTitulo'>Utilizadores</h4>
                <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
            </template>
            <template>
                <b-col id="inputGerirUtilizador" cols="5">
                    <b-form-input v-model="nomeUtilizador" placeholder="Nome de utilizador"></b-form-input>
                </b-col>
                <div v-for="(utilizador, index) in utilizadores" :key="index">
                    <b-row class="utilizadores" v-if="utilizador.nome != getLoggedUser.nome">
                        <b-col class="nomeUtilizadores">{{utilizador.nome}}</b-col>
                        <b-col><b-button class='botaoEditarUtilizador tipoUtilizadores' @click="mudarTipo(utilizador.nome)" >{{utilizador.tipo}}</b-button></b-col>
                        <b-col><b-button class='botaoEditarUtilizador removerUtilizadores' @click="removerUtilizador(utilizador.nome)">Remover</b-button></b-col>
                    </b-row>
                </div>              
            </template>
            <template #modal-footer='{close}'>
                <b-button @click="close()">Fechar</b-button>
            </template>
        </b-modal>

        <!-- Adicionar Desafios -->
        <b-modal ref="adicionarDesafio" id="adicionarDesafio" centered
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light">
            <template #modal-header='{close}'>
                <h4 class='modalTitulo'>Adicionar Desafios</h4>
                <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
            </template>
            <template>
                <form @submit.prevent = "adicionarDesafio">                   
                    <div>
                        <b-form-group class='mb-3' label="Nome do desafio:" label-for="nomeDesafio">
                            <b-form-input id="nomeDesafio" v-model="formDesafios.nome" type="text" placeholder="Nome do desafio" required></b-form-input>
                        </b-form-group>
                        <b-form-group class='mb-3' label="Numero de etapas:" label-for="numEtapas">
                            <b-form-input id="numEtapas" v-model="formDesafios.nEtapas" type="number" placeholder="Numero de etapas" required></b-form-input>
                        </b-form-group>
                        <b-form-group class='mb-3' label="Anexo:" label-for="anexoDesafio">
                            <b-form-input id="anexoDesafio" v-model="formDesafios.anexo" type="url" placeholder="Anexo" required></b-form-input>
                        </b-form-group>
                    </div>              
                </form>
            </template>
            <template #modal-footer>
                <b-button @click="adicionarDesafio()">Adicionar</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    
    export default {
        name: 'PaginaPerfil',
        data() {
            return {
                form: {
                    imagemNova: '',
                    novaPalavraPasse: '',
                },
                formDesafios: {
                    nome: '',
                    nEtapas: 0,
                    anexo: '',
                },
                nomeUtilizador: '',
            }
        },

        computed: {
            ...mapGetters(['getLoggedUser', 'getUtilizadores', 'getDesafios', 'isDesafioAvailable']),

            desafios(){
                let desafios = this.getDesafios.filter((desafio) => desafio.nEtapas > this.getLoggedUser.numJogos).slice(0).sort(this.ordenarDesfios);
                desafios = desafios.slice(0, 5);
                return desafios;
            },

            progressoDesafio(){
                return this.getLoggedUser.numJogos
            },

            badges(){
                return this.getLoggedUser.desafios
            },

            utilizadores(){
                return this.getUtilizadores.filter((utilizador) => (utilizador.nome.includes(this.nomeUtilizador) || this.nomeUtilizador == '') && utilizador.nome != this.getLoggedUser.nome).slice(0);
            }
        },
        methods: {
            ...mapMutations(['SET_GERIR_UTILIZADORES', 'SET_NOVO_DESAFIO', 'SET_FILME_ATUAL']),

            editarPerfil(){
                if(this.form.novaPalavraPasse != ''){
                    this.getLoggedUser.palavra_passe = this.form.novaPalavraPasse;
                    localStorage.loggedUser = JSON.stringify(this.getLoggedUser)
                }
                
                if(this.form.imagemNova != ''){
                    this.getLoggedUser.foto = this.form.imagemNova
                    localStorage.loggedUser = JSON.stringify(this.getLoggedUser)
                }

                this.$refs['editarPerfilModal'].hide()
            },

            mudarTipo(nome){
                let utilizador = this.getUtilizadores.find((utilizador) => utilizador.nome == nome);
                utilizador.tipo = utilizador.tipo == 'admin' ? 'utilizador' : 'admin';
                this.SET_GERIR_UTILIZADORES(this.getUtilizadores);
            },

            removerUtilizador(nome){
                if (confirm("Tens acerteza que queres eliminar esta utilizador?")) {
                    this.SET_GERIR_UTILIZADORES(this.getUtilizadores.filter((utilizador) => utilizador.nome != nome));
                }
            },

            ordenarDesfios(desafioA, desafioB){
                if (desafioA.nEtapas < desafioB.nEtapas) return -1;
                else if (desafioA.nEtapas > desafioB.nEtapas) return 1;
                else return 0;
            },

            adicionarDesafio(){
                if(this.formDesafios.nome != '' && this.formDesafios.nEtapas > 0 && this.formDesafios.anexo != ''){
                    if(this.isDesafioAvailable(this.formDesafios.nome)){
                        let novoDesafio = {
                            nome: this.formDesafios.nome,
                            nEtapas: this.formDesafios.nEtapas,
                            imagem: this.formDesafios.anexo,
                        };

                        this.SET_NOVO_DESAFIO(novoDesafio);                                                
                        this.$refs['adicionarDesafio'].hide()

                    }
                }
            },

            escolherFilme(nome) {
                this.SET_FILME_ATUAL(nome);
                this.$router.push({ name: "filme", params:{ filmeNome: nome }});
            },

        },
    };
    
</script>

<style scoped>
.imagemUtilizador{
    position: relative;
}

#editarPerfil{
    position: absolute;
    bottom: 15px;
    left: 54%;
    width: 45px;
}

#utilizador{
    margin:auto;
    text-align: center;
}

#nomeUtilizador{
    font-family: var(--font1);
    font-size:40px;
    margin-right: 1vw;;
}

#listasUtilizador{
    margin:auto;
    margin-bottom: 5vh;
    text-align: center;
}

#imgPerfil{
    border-radius: 50%;
    width: 225px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
}

#desafios{
    position: relative;
    font-family: var(--font2);
    color: var(--cor0);
    font-size: 17px;
    left: 9.5vw;
    z-index: 2;
    top: -15px;
}

#badges{
    position: relative;
    font-family: var(--font2);
    color: var(--cor0);
    font-size: 17px;
    left: 36.5vw;
    z-index: 2;
    top: -15px;
}

.badge{
    width: 25%;
    height: 100px;
    padding: 0;
    font-family: var(--font1);
    text-align: center;
}

.badge > div > img{
    width: 45%;
}

#vetor1{
    position: relative;
    width: 15vw;
    height: 15vh;
    top: -15px;
    z-index: 1;
}

#vetor2{
    position: relative;
    width: 15vw;
    height: 15vh;
    left: 27.5vw;
    top: -15px;
    z-index: 1;
}

#divDesafios{
    position: relative;
    top: -10vh;
    left: 5vw;
    width: 40vw;
    height: 325px;
    background-color: var(--cor3);
    padding: 5%;
    padding-top: 10%;
}

#divBadges{
    position: relative;
    top: -10vh;
    left: 2vw;
    width: 40vw;
    height: 325px;
    background-color: var(--cor3);
    padding: 2.5%;
    padding-top: 10%;
    overflow: auto;
}

#divBadges::-webkit-scrollbar {
background:#333;
}
 
#divBadges::-webkit-scrollbar-thumb {
background: var(--cor4);
}

.botoes{
    margin-top: 5vh;
    margin-left: 1%;
    
}

.utilizadores{
    padding: 10px;
}

.botaoEditarUtilizador{
    width: 110px;
    height: 35px;
    border-radius: 15px;
}

.tipoUtilizadores{
    background-color: var(--cor3);
    font-family: var(--font1);
}

.tipoUtilizadores:hover{
    background-color: var(--cor3);
    opacity: 90%;
}

.removerUtilizadores{
    background-color: var(--cor2);
    font-family: var(--font1);
}

.removerUtilizadores:hover{
    background-color: var(--cor2);
    opacity: 90%;
}

.modalTitulo{
  margin: auto;
  font-family: var(--font2);
  color: white;
}

.fecharModal{
  position: absolute;
  right: 5px;
  top: 0px;
  color: white;
}

#adicionarDesafio{
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--cor2);
    font-family: var(--font1);
}

.imagemLista{
    margin-right: 3%;
    margin-bottom: 4%;
    margin-left: 1%;
    cursor: pointer;
    opacity: 90%;
}

.imagemLista:hover{
    opacity: 100%;
}

#inputGerirUtilizador{
    margin-bottom: 5%;
}


.desafio{
    margin-bottom: 7px;
}

.bodyModal{
  text-align: center;
}

.inputsEditarPerfil{
    margin-bottom: 10px;
}

.textoModal{
    text-align: center;
    font-family: var(--font1);
    font-size: 1.25em;
}

.textoModal > p > .link{
    text-decoration: none;
    color: black;
}

.textoModal > p > .link:hover{
    text-decoration: underline;
    font-family: var(--font2);
}
</style>