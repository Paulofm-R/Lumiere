<template>
    <div>
        <b-row>
            <img src="../assets/img/User.svg" id="imgPerfil">
        </b-row>
        <b-col id="utilizador" cols="4">
            <span id="nomeUtilizador">{{getLoggedUser.nome}}</span>
            <b-button variant="warning" v-b-modal.editarPerfilModal class="botoes" id="editarPerfil" ><b-icon icon="pencil-square"></b-icon></b-button>
        </b-col>
        <b-col id='listasUtilizador' cols='8'>
            <b-button variant="info" class="botoes"><b-icon icon="heart-fill"></b-icon>  Favoritos</b-button>
            <b-button variant="info" class="botoes"><b-icon icon="play-fill"></b-icon>  A minha lista</b-button>
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

        <b-modal id="editarPerfilModal" centered
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light">
                <template #modal-header="">
                    Editar Perfil
                </template>
                <template>
                  <form @submit.prevent = "editarPerfil">                   
                    <div>
                        <label for="urlFotoJogo">URL da imagem</label>
                        <input id="urlFotoPerfil" type="file" accept="image/jpeg, image/png" @change="fotoPerfil()">
                        <label for="novaPalavraPasse">Nova Palavra Passe: </label>
                        <input type="password" id="novaPalavraPasse" v-model="form.novaPalavraPasse">
                    </div>               
                  </form>
                </template>
                <template #modal-footer>
                    <b-button id='editar' @click='editarPerfil()'>Aceitar Alterações</b-button>
                </template>
          </b-modal>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    
    export default {
        computed: {
            ...mapGetters(['getLoggedUser',])
        },
        data() {
            return {
                form: {
                    imagemNova: '',
                    novaPalavraPasse: '',
                }
                
            }
        },
        methods: {
            editarPerfil(){
                this.getLoggedUser.palavra_passe = this.form.novaPalavraPasse;
                console.log(this.getLoggedUser.palavra_passe)
            },
            fotoPerfil(){
                this.getLoggedUser.foto = this.form.imagemNova
                console.log(this.form.imagemNova)

            }
        }
    };
    
</script>

<style scoped>
    #utilizador{
        margin:auto;
        text-align: center;
    }

    #nomeUtilizador{
        font-family: var(--font1);
        font-size:40px;
        margin-right: 1vw;;
    }

    #editarPerfil{
        position: relative;
        top: -3.5vh;
    }

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

    

</style>