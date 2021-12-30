<template>
    <div>
        <b-container fluid>
            <h2>Mamma Mia</h2>
            <img src="../assets/img/MammaMiaTeaserPoster.jpg" id="imgFilme">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/lkN-A00WLYE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <br>
            <b-col cols="6">
                <div>
                    <a id="rate">4.0/5.0</a>
                    <b-button v-b-modal.avaliarModal id="avaliar" variant="info">Avaliar</b-button>
                    <b-button @click="favoritos()" variant="info" id="favoritos">	&#9829; </b-button>
                    <b-button @click="lista()" variant="info" id="lista">+</b-button>
                </div>
                <div>
                    <p><span>Sinopse: </span>Donna, a proprietária de um hotel nas ilhas gregas, está preparando o casamento de sua filha com a ajuda de duas amigas. Enquanto isso, a noiva Sophie convida três ex-namorados de sua mãe na esperança de conhecer seu verdadeiro pai.</p>
                    <p><span>Ano: </span>2008</p>
                    <p><span>Realizador: </span>Phyllida Lloyd</p>
                    <p><span>Produtora: </span>Universal Studios</p>
                    <p><span>Elenco: </span>Meryl Streep, Amanda Seyfried, Pierce Brosnan, Colin Firth, Chistine Baranski,, Dominic Cooper, Stellan Skarsgard, Julie Walters</p>
                    <p><span>Género: </span>Musical/Romance</p>
                </div>    
            </b-col>
            <b-col>
                <div id="zonaComentarios">
                    <h3>Comentários</h3>
                    <img src="../assets/img/User.svg" id="user">
                    <input type="image" src="../assets/img/spoiler.svg">
                    <p id="username">Rogério Fagundes</p>
                    <p id="comentarioUser">Um dos filmes que mais gosto, uma vez que usa as músicas da minha banda favorita, ABBA, enquanto nos cativa no inigma que desenrola toda a história.</p>
                    <div id="comentarioUserFundo">
                    </div>
                </div>
            </b-col>

            <b-modal id="avaliarModal" centered
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light">
                <template #modal-header="">
                    AVALIAR
                </template>
                <template>
                  <form submit.prevent = "login">                   
                    <div class="rating"> <input type="radio" name="rating" value="5" id="5"><label for="5">☆</label> <input type="radio" name="rating" value="4" id="4"><label for="4">☆</label> <input type="radio" name="rating" value="3" id="3"><label for="3">☆</label> <input type="radio" name="rating" value="2" id="2"><label for="2">☆</label> <input type="radio" name="rating" value="1" id="1"><label for="1">☆</label> </div>   
                    <div>
                        <p>Comentário:</p>
                        <input type="text">
                    </div>                
                  </form>
                </template>
                <template #modal-footer>
                    <b-button id='avaliar' @click='avaliar()'>Avaliar</b-button>
                </template>
          </b-modal>
            
        </b-container>
        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    h2{
        margin-top:3%;
        margin-bottom:2%;
    }
    #imgFilme{
        position: relative;
        width: 10%;
        height: 10%;
        top: -13.5vh;
        z-index: 1;
    }
    iframe{
        position: relative;
        left:-9.2vw;

    }
    button{
        margin-left: 1%;
        margin-right: 0.5%;
        margin-bottom: 0.5%;
    }
    span{
        font-family: var(--font2);
    }
    a{
        font-family: var(--font2);        
    }
    input{
        width: 100%;
        height: 20vh;
    }
    #rate{
        position: relative;
        top:-20%
    }
    #zonaComentarios{
        width: 100%;
        height: 100%;
        background-color: var(--cor3)
    }
    #user{
        position: relative;
        width: 5%;
        height: 5%;
        border-radius: 50%;
        left: 2%;
    }
    #comentarioUser{
        position: relative;
        left: 9%;
        top:-12.5vh;
    }
    #comentarioUserFundo{
        position: relative;
        width: 95%;
        height: 15%;
        left: 9%;
        background-color: var(--cor0)
    }
    #username{
        position: relative;
        font-family: var(--font2);
        font-size: 15px;
        color:white;
        left: 9%;
        top:-10vh;
    }
    .rating {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center
    }

    .rating>input {
        display: none
    }

    .rating>label {
        position: relative;
        width: 1em;
        font-size: 30px;
        font-weight: 300;
        color: var(--cor2);
        cursor: pointer
    }

    .rating>label::before {
        content: "\2605";
        position: absolute;
        opacity: 0
    }

    .rating>label:hover:before,
    .rating>label:hover~label:before {
        opacity: 1 !important
    }

    .rating>input:checked~label:before {
        opacity: 1
    }

    .rating:hover>input:checked~label:before {
        opacity: 0.4
    }
</style>