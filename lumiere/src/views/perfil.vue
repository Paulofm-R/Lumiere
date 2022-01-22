<template>
    <div>
        <b-row class="imagemUtilizador">
            <img :src="getLoggedUser.foto" id="imgPerfil" />
            <b-button variant="warning" v-b-modal.editarPerfilModal id="editarPerfil" ><b-icon icon="pencil-square"></b-icon></b-button>
        </b-row>
        <b-col id="utilizador" cols="4">
            <span id="nomeUtilizador">{{getLoggedUser.nome}}</span>
        </b-col>
        <b-col id='listasUtilizador' cols='8'>
            <b-button variant="info" class="botoes"><b-icon icon="heart-fill"></b-icon>  Favoritos</b-button>
            <b-button variant="info" class="botoes"><b-icon icon="play-fill"></b-icon>  A minha lista</b-button>
            <b-button v-if="getLoggedUser.tipo == 'admin'" variant="info" class="botoes" v-b-modal.utilizadoresModal><b-icon icon="person-fill"></b-icon> Utilizadores</b-button>

        </b-col>
        <b-col cols="8">
            <span id="desafios">Desafios</span>
            <img src="../assets/img/vetor.svg" id="vetor1">
            <span id="badges">Badges</span>
            <img src="../assets/img/vetor.svg" id="vetor2">
        </b-col>
        <b-col cols="6">
            <div id="divDesafios">
                <!-- <b-progress v-for="(desafio, index) in desafios" :key='index' :value="value" :max="max" class="mb-3"></b-progress> -->
            </div>
            <div id="divBadges">
                <!-- badges do utilizador -->
            </div>
        </b-col>

        <!-- Modais -->
        <!-- Modal de editar perfil -->
        <b-modal id="editarPerfilModal" centered
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light">
            <template #modal-header='{close}'>
                <h4 class="modalTitulo">Editar Perfil</h4>
                <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
            </template>
            <template>
                <form @submit.prevent = "editarPerfil">                   
                    <div>
                        <label for="urlFotoJogo">Nova Foto</label>
                        <input type="url" width="30vw" height="30vh" v-model="form.imagemNova">
                        <!-- <input id="urlFotoPerfil" type="image" :src='getLoggedUser.foto' width="30vw" height="30vh" v-model ="form.imagemNova"> -->
                        <label for="novaPalavraPasse">Nova Palavra Passe: </label>
                        <input type="password" id="novaPalavraPasse" v-model="form.novaPalavraPasse">
                    </div>               
                </form>
            </template>
            <template #modal-footer>
                <b-button>Aceitar Alterações</b-button>
            </template>
        </b-modal>

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
                <form @submit.prevent = "editarUtilizadores">                   
                    <div v-for="(utilizador, index) in getUtilizadores" :key="index">
                        <b-row class="utilizadores" v-if="utilizador.nome != getLoggedUser.nome">
                            <b-col class="nomeUtilizadores">{{utilizador.nome}}</b-col>
                            <b-col><b-button class='botaoEditarUtilizador tipoUtilizadores' @click="mudarTipo(utilizador.nome)" >{{utilizador.tipo}}</b-button></b-col>
                            <b-col><b-button class='botaoEditarUtilizador removerUtilizadores' @click="removerUtilizador(utilizador.nome)">Remover</b-button></b-col>
                        </b-row>
                    </div>              
                </form>
            </template>
            <template #modal-footer='{close}'>
                <b-button @click="close()">Fechar</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    
    export default {
        name: 'Perfil',
        data() {
            return {
                form: {
                    imagemNova: '',
                    novaPalavraPasse: '',
                }
                
            }
        },

        computed: {
            ...mapGetters(['getLoggedUser', 'getUtilizadores'])
        },
        methods: {
            ...mapMutations(['SET_GERIR_UTILIZADORES']),

            editarPerfil(){
                if(this.form.novaPalavraPasse != ''){
                    this.getLoggedUser.palavra_passe = this.form.novaPalavraPasse;
                    localStorage.loggedUser = JSON.stringify(this.getLoggedUser)
                    console.log(this.getLoggedUser.palavra_passe)
                }
                

                this.getLoggedUser.foto = this.form.imagemNova
                localStorage.loggedUser = JSON.stringify(this.getLoggedUser)
                console.log(this.form.imagemNova)
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
            }
        },
        created () {
            console.log(this.getLoggedUser.foto);
        },
    };
    
</script>

<style scoped>
.imagemUtilizador{
    position: relative;
}

#editarPerfil{
    position: absolute;
    bottom: 0;
    left: 55%;
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

/* #editarPerfil{
    position: relative;
    top: -3.5vh;
} */

#listasUtilizador{
    margin:auto;
    text-align: center;
}

#imgPerfil{
    border-radius: 50%;
    width: 20%;
    height: 20%;
    margin-left: auto;
    margin-right: auto;
}

#desafios{
    position: relative;
    font-family: var(--font2);
    color: var(--cor0);
    font-size: 17px;
    left: 11.5vw;
    z-index: 2;
}

#badges{
    position: relative;
    font-family: var(--font2);
    color: var(--cor0);
    font-size: 17px;
    left: 35vw;
    z-index: 2;
}

#vetor1{
    position: relative;
    width: 20vw;
    height: 20vh;
    z-index: 1;
}

#vetor2{
    position: relative;
    width: 20vw;
    height: 20vh;
    left: 23vw;
    z-index: 1;
}

#divDesafios{
    position: relative;
    top: -10vh;
    left: 5vw;
    width: 40vw;
    height: 35vh;
    background-color: var(--cor3);
    
}

#divBadges{
    position: relative;
    top: -45vh;
    left: 51.4vw;
    width: 40vw;
    height: 35vh;
    background-color: var(--cor3);
    
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

</style>