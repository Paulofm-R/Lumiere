<template>
    <div>
        <b-container fluid>
            <div id="txtEntrada">
                <b-col cols="12">
                    <h1>És amante da sétima arte?</h1>
                    <p id="entrada">Mostra-nos os teus conhecimentos ou conhece <br> novos filmes e  séries no catálogo, podes <br> encontrar o que os nossos  cinéfilos pensam sobre <br> eles.</p>
                </b-col>
            </div> 
            <div id="links">
                <b-row align="center center">
                    <router-link class="link" :to="{name: 'filmes'}">
                        <div id="catalogo"></div>
                    </router-link>
                    <router-link class="link" :to="{name: 'jogos'}">
                        <div id="jogos"></div>
                    </router-link>
                    <router-link class="link" :to="{name: 'sobreNos'}">
                        <div id="sobreNos"></div>
                    </router-link>
                    
                </b-row>
            </div>
            <div id="infoCatalogo">
                <h3>CATÁLOGO</h3>
                <p align="left">Conhece novos filmes e séries, e a opinião dos <br> nossos utilizadores. Ou então, conta-nos a tua <br> opinião sobre as mesma e dá a conhecer a tua <br> opinião a todos.</p>
                <img src="../assets/img/vetor.svg" id="vetor1">
                <img src="../assets/img/catalogoImg.svg" id="imgCatalogo">
            </div>
            <div id="infoJogos">
                <h3 align="right">JOGOS</h3>
                <p style="text-align: right">Encontra diversos jogos sobre os teus filmes e <br> séries favoritas. Compete contra outros cinéfilos <br> como tu e prova quem é o verdadeiro conhecedor <br> da sétima arte. Entra para jogar!</p>
                <img src="../assets/img/vetor.svg" id="vetor2">
                <img src="../assets/img/jogosImg.svg" id="imgJogo">

            </div>
            <div id="infoSobreNos">
                <h3>SOBRE NÓS</h3>
                <p align="left">Descobre um pouco como começou este projeto e <br> tudo sobre nós!</p>
                <img src="../assets/img/vetor.svg" id="vetor3">
                <img src="../assets/img/sobreNosImg.svg" id="imgSobreNos">

            </div>

        </b-container>
        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    h1{
        text-align: center;
        padding-top: 500 px;
        font-size: 92px;
        font-family: var(--font1) bold;
        padding-top: 75px;
    }

    h3{
        margin-left: 12vw;
        margin-right: 12vw;
        /* padding-top: 15vh; */
        font-family: var(--font2);
        font-size: 50px;
    }

    p{
        margin-left: 12vw;
        margin-right: 12vw;
        padding-top: 3vw;
        font-family: var(--font1);
        font-size: 20px;
    }

    .link {
        width: 15vw;
        height: 30vh;
    }

    #entrada{
        text-align: center;
        font-size: 24px;
        font-family: var(--font1);
        padding-top: 30px;
        margin-bottom: 30px;
    }

    #txtEntrada{
        background-image: url("../assets/img/LogoEntrada.svg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 30%;
    }

    #catalogo{
        position: relative;
        width: 15vw;
        height: 30vh;
        background-color: var(--cor2);
        margin-left: 285px;
        margin-right: 30px;
        align-content: center;
        background-image: url('../assets/img/catalogoImg.svg');
        background-repeat: no-repeat;
        background-position: center;

    }

    #catalogo:hover{
        background-color: var(--cor3);
        background-image: url('../assets/img/catalogo.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;

    }

    #imgCatalogo{
        position: relative;
        top: -24vh;
        left: 38.5%;
        width: 20vw;
        height: 20vh;
    }

    #vetor1{
        position: relative;
        top: -24vh;
        left: 65%;
        width: 30vw;
        height: 30vh;
    }

    #jogos{
        position: relative;
        width: 15vw;
        height: 30vh;
        background-color: var(--cor2);
        margin-left: 22.4vw;
        margin-right: 30px;
        background-image: url('../assets/img/jogosImg.svg');
        background-position: center;
    }

    #jogos:hover{
        background-color: var(--cor3);
        background-image: url('../assets/img/jogos.svg');
        background-position: center;
        background-size: 110%;

    }

    #imgJogo{
        position: relative;
        top: -24vh;
        left: -16.5%;
        width: 20vw;
        height: 20vh;
    }

    #vetor2{
        position: relative;
        top: -24vh;
        left: 10%;
        width: 30vw;
        height: 30vh;
    }

    #sobreNos{
        position: relative;
        width: 15vw;
        height: 30vh;
        background-color: var(--cor2);
        margin-left: 26.1vw;
        margin-right: 30px;
        /* text-align: center; */
        background-image: url('../assets/img/Logo.svg');
        background-repeat: no-repeat;
        background-position: center;

    }

    #sobreNos:hover{
        background-color: var(--cor3);
        background-image: url('../assets/img/sobreNos.svg');
        background-position: center;
        background-size: 98%;

    }

    #vetor3{
        position: relative;
        top: -24vh;
        left: 65%;
        width: 30vw;
        height: 30vh;
    }

    #imgSobreNos{
        position: relative;
        top: -24vh;
        left: 38.5%;
        width: 20vw;
        height: 20vh;
    }

    #infoCatalogo{
        margin-top: 15vh;
    }
</style>