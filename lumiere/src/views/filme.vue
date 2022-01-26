<template>
    <div>
        <b-container fluid>
            <h2>{{filme.nome}}</h2>
            <img :src="filme.imagem" id="imgFilme">
            <iframe width="560" height="315" :src="filme.trailer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen id="trailer"></iframe>
            <br>
            <b-col cols="6">
                <div>
                    <a id="rate"><span>{{filme.avaliacao}}</span><b-icon icon="star-fill"></b-icon>/5.0</a>
                    <b-button @click="avaliarModal()" id="avaliar" variant="info">Avaliar</b-button>
                    <b-button v-if="getLoggedUser != ''" @click="favoritos()" variant="info" id="favoritos">	&#9829; Adicionar aos favoritos</b-button>
                    <b-button v-if="getLoggedUser != ''" @click="lista()" variant="info" id="lista">A minha lista</b-button>
                </div>
                <div class="infoFilme"> 
                    <p><span>Sinopse: </span>{{filme.sinopse}}</p>
                    <p><span>Ano: </span>{{filme.ano}}</p>
                    <p><span>Realizador: </span><a class="infoFilme">{{realizador}}</a></p>
                    <p><span>Produtora: </span><a class="infoFilme">{{filme.produtora}}</a></p>
                    <p><span>Elenco: </span><a class="infoFilme">{{elenco}} </a></p>
                    <p><span>Género: </span><a>{{categoria}} </a></p>
                </div>    
            </b-col>
            <b-row>
                <div id="zonaComentarios">
                    <hr>
                    <h3>Comentários</h3>
                    <b-row class="comentario" v-for="(comentario, index) in comentarios" :key="index">
                        <b-col cols="1" class='imagemSpoiler'>
                            <img :src="utilizadorFoto(comentario.utilizador)" class="imagemUtilizador">
                            <input @click='spoiler(comentario)' type="image" src="./image/spoiler.svg" class="botaoSpoiler">
                        </b-col>
                        <b-col class="coment">
                            <p id="username">{{comentario.utilizador}}</p>
                            <b-button v-if="comentario.spoiler == true" @click="comentario.spoiler = false" class="esconderSpoiler">VER SPOILER</b-button>
                            <p id="comentarioUser">{{comentario.comentario}}</p>
                        </b-col>
                    </b-row>
                    <div id="comentarioUserFundo">
                    </div>
                </div>
            </b-row>

            <b-modal ref='avaliarModal' id="avaliarModal" centered
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light">
                <template #modal-header="{close}">
                    <h4 class='modalTitulo'>AVALIAR</h4>
                    <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                </template>
                <template>
                  <form @submit.prevent = "avaliar">                   
                    <div>
                        <b-form-rating v-model="avaliacao"></b-form-rating>
                    </div>
                    <div>
                        <p>Comentário:</p>
                        <b-form-textarea id="textarea" v-model="comentario" placeholder="Seu comentario" rows="5"></b-form-textarea>
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
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: 'Filme',
        data() {
            return {
                filme: {},
                avaliacao: '',
                comentario: '',
            }
        },

        computed: {
            ...mapGetters(['getFilmes', 'getLoggedUser', 'getUtilizadores', 'isFilmeFavoritoValido', 'isFilmeListaValido']),

            elenco(){
                return this.filme.elenco.join(', ');
            },

            categoria(){
                return this.filme.categoria.join(', ');
            },
            realizador(){
                return this.filme.realizador.join(', ');
            },

            comentarios(){
                return this.filme.comentarios;
            }
        },

        
        created () {
            this.filme = this.getFilmes.find((filme) => filme.nome == this.$route.params.filmeNome);
        },

        methods:{
            ...mapMutations(['SET_NOVO_COMENTARIO', 'SET_NOVA_AVALIACAO', 'SET_NOVO_FAVORITO', 'SET_NOVA_LISTA', 'SET_SPOILER']),

            avaliarModal(){
                if(this.getLoggedUser != ''){
                    this.$refs['avaliarModal'].show()
                }
            },

            avaliar() {
                if(this.avaliacao > 0){
                    this.SET_NOVA_AVALIACAO(this.avaliacao)
                }
                if(this.comentario.length > 0){
                    let novoComentario = {
                        utilizador: this.getLoggedUser.nome,
                        comentario: this.comentario,
                        spoiler: false,
                    }
                    this.SET_NOVO_COMENTARIO(novoComentario)
                }
                this.$refs['avaliarModal'].hide()
            },
            favoritos() {
                if(this.isFilmeFavoritoValido(this.filme.nome)){
                    this.SET_NOVO_FAVORITO(this.filme.nome)
                }
            },
            lista() {
                if(this.isFilmeListaValido(this.filme.nome)){
                    this.SET_NOVA_LISTA(this.filme.nome)
                }
            },

            utilizadorFoto(nome){
                let utilizador = this.getUtilizadores.find((utilizador) => utilizador.nome == nome)
                if(utilizador == undefined){
                    return '../assets/img/User.svg'
                }
                else{
                    return utilizador.foto
                }
            },

            spoiler(comentario){
                comentario.spoiler = comentario.spoiler == false ? true : false;
                this.SET_SPOILER()
            }

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
    font-size: 20px;
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
}

.comentario{
    margin-top: 5vh;
}

.imagemUtilizador{
    width: 75px;
    height: 75px;
    border-radius: 50%;
}

#comentarioUser{
    
}
#comentarioUserFundo{
    width: 95%;
    height: 15%;
    background-color: var(--cor0)
}
#username{
    font-family: var(--font2);
    font-size: 18px;
    color:white;
}

.infoFilme{
    text-decoration: none;
    color:white;
    font-family: var(--font1);
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

.imagemSpoiler{
    position: relative;
}

.botaoSpoiler{
    position: absolute;
    top: -10px;
    right: 25px;
    width: 30px;
}

.coment{
    position: relative;
}

.esconderSpoiler{
    position: absolute;
    left: -10px;
    top: 30px;
    width: 100%;
    height: 100%;
    font-family: var(--font1);
    background-color: var(--cor2)
}
</style>