<template>
    <div>
        <b-container fluid>
            <h2>{{filme.nome}}</h2>
            <img :src="filme.imagem" id="imgFilme">
            <!-- <video width="560" height="315" controls id="trailer">
                <source :src="filme.trailer" type="video/.mp4">
            </video> -->
            <!-- <span id="trailer">{{filme.trailer}}</span> -->
            <iframe width="560" height="315" :src="filme.trailer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen id="trailer"></iframe>
            <br>
            <b-col cols="6">
                <div>
                    <a id="rate"><span>{{filme.avaliacao}}</span>/5.0</a>
                    <b-button v-b-modal.avaliarModal id="avaliar" variant="info">Avaliar</b-button>
                    <b-button @click="favoritos()" variant="info" id="favoritos">	&#9829; Adicionar aos favoritos</b-button>
                    <b-button @click="lista()" variant="info" id="lista">A minha lista</b-button>
                </div>
                <div>
                    <p><span>Sinopse: </span>{{filme.sinopse}}</p>
                    <p><span>Ano: </span>{{filme.ano}}</p>
                    <p><span>Realizador: </span>{{filme.realizador}}</p>
                    <p><span>Produtora: </span>{{filme.produtora}}</p>
                    <p><span>Elenco: </span><a v-for="(elemento, index) in filme.elenco" :key="index">{{elemento}} </a></p>
                    <p><span>Género: </span><a v-for="(categoria, index) in filme.categoria" :key="index">{{categoria}} </a></p>
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
                  <form @submit.prevent = "avaliar">                   
                    <div>
                        <b-form-rating v-model="avaliacao"></b-form-rating>
                        <p class="mt-2">Value: {{ avaliacao }}</p>
                    </div>
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
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                filme: {},
                avaliacao: '',
                comentario: '',
            }
        },

        computed: {
            ...mapGetters(['getFilmes']),
        },

        
        created () {
        this.filme = this.getFilmes.find((filme) => filme.nome == this.$route.params.filmeNome);
        },

        methods:{
            avaliar() {
                if(this.filme.avaliacao <= 5){
                    this.filme.avaliacao *= this.filme.nAvaliacoes
                    this.filme.avaliacao += this.avaliacao
                    this.filme.nAvaliacoes += 1
                    this.filme.avaliacao /= (this.filme.nAvaliacoes)
                    this.filme.avaliacao = this.filme.avaliacao.toFixed(1)
                }
                
            },

            

            
        }
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
    #trailer{
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
    
</style>