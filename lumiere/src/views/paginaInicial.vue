<template>
    <div>
        <b-container fluid>
            <div id="txtEntrada">
                <b-col cols="12">
                    <h1>És amante da sétima arte?</h1>
                    <p id="entrada">Mostra-nos os teus conhecimentos ou conhece <br> novos filmes e  séries no catálogo, podes <br> encontrar o que os nossos  cinéfilos pensam sobre <br> eles.</p>
                    <!-- <img src="../assets/img/Logo.svg"> -->
                </b-col>
            </div> 
            <div id="links">
                <b-row align="center center">
                    <div id="catalogo"></div>
                    <div id="jogos"></div>
                    <div id="sobreNos"></div>
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
                <p align="right">Encontra diversos jogos sobre os teus filmes e <br> séries favoritas. Compete contra outros cinéfilos <br> como tu e prova quem é o verdadeiro conhecedor <br> da sétima arte. Entra para jogar!</p>
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

<style>
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
        padding-top: 3vw;
        font-family: var(--font2);
        font-size: 700pt;
    }

    p{
        margin-left: 12vw;
        margin-right: 12vw;
        padding-top: 3vw;
        font-family: var(--font1);
        font-size: 24pt;
    }

    #entrada{
        text-align: center;
        font-size: 24px;
        font-family: var(--font1);
        padding-top: 30px;
        margin-bottom: 30px;
    }

    #txtEntrada{
        background-image: url("../assets/img/Logo.svg");
        background-repeat: no-repeat;
        background-position: center center;
    }

    /* img{
        position: relative;
        opacity: 0.4;
        width: 60vw;
        height: 60vh;
        top: -35vh;
        left: 19vw;
        
    } */

    #catalogo{
        position: relative;
        width: 15vw;
        height: 30vh;
        background-color: var(--cor3);
        margin-left: 300px;
        margin-right: 30px;
        align-content: center;
        background-image: url('../assets/img/catalogo.svg');

    }

    #catalogo:hover{
        background-color: var(--cor2);
        background-image: url('../assets/img/catalogo.svg');

    }

    #infoCatalogo{
        text-align: right;
    }

    #imgCatalogo{
        position: relative;
        top: -20vh;
        left: 49.5%;
        width: 15vw;
        height: 15vh;
    }

    #vetor1{
        position: relative;
        top: -20vh;
        left: 68%;
        width: 20vw;
        height: 20vh;
    }

    #jogos{
        position: relative;
        width: 15vw;
        height: 30vh;
        background-color: var(--cor3);
        margin-left: 30px;
        margin-right: 30px;
        background-image: url('../assets/img/jogos.svg');

    }

    #jogos:hover{
        background-color: var(--cor2);
        background-image: url('../assets/img/jogos.svg');

    }

    #imgJogo{
        position: relative;
        top: -20vh;
        left: -8vw;
        width: 15vw;
        height: 15vh;
    }

    #vetor2{
        position: relative;
        top: -20vh;
        left: 10%;
        width: 20vw;
        height: 20vh;
    }

    #sobreNos{
        position: relative;
        width: 15vw;
        height: 30vh;
        background-color: var(--cor3);
        margin-left: 30px;
        margin-right: 30px;
        text-align: center;
        background-image: url('../assets/img/sobreNos.svg');

    }

    #sobreNos:hover{
        background-color: var(--cor2);
        background-image: url('../assets/img/sobreNos.svg');

    }

    #vetor3{
        position: relative;
        top: -20vh;
        left: 68%;
        width: 20vw;
        height: 20vh;
    }

    #imgSobreNos{
        position: relative;
        top: -20vh;
        left: 52.5%;
        width: 10vw;
        height: 10vh;
    }
</style>