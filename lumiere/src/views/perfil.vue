<template>
    <div>
        <b-row>
            <img src="../assets/img/User.svg" id="imgPerfil">
        </b-row>
        <b-col>
            <span>Brozinho da silva</span>
            <b-button variant="warning" class="botoes"><b-icon icon="pencil-square"></b-icon></b-button>
        </b-col>
        <b-col cols='8'>
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

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
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
        
    }

    

</style>