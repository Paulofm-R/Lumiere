<template>
    <div>
        <b-container fluid>
            <form>
                <div>
                    <b-form-input id="nomeFilme" v-model="form.nome" placeholder="Nome do Filme/Serie"></b-form-input>
                </div>
                <div>
                    <b-button id="imgFilme">Poster do Filme +</b-button>
                    <b-button id="trailer">Trailer do Filme +</b-button>
                </div>
                <!-- <iframe width="560" height="315" :src="filme.trailer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen id="trailer"></iframe> -->
                <br>
                <b-col cols="6">
                    <div class="infoFilme">
                        <p><span>Sinopse: </span><b-form-textarea id="textareaSinopse" placeholder="Sinopse do Filme/Serie" rows="5" v-model="form.sinopse"></b-form-textarea></p>

                        <b-row>
                            <b-col cols="2">
                                <p><span>Ano: </span></p>
                                <p><span>Realizador: </span></p>
                                <p><span>Produtora: </span></p>
                                <p><span>Elenco: </span></p>
                                <p><span>Género: </span></p>
                            </b-col>
                            <b-col cols="5" id="inputsInfFilme">
                                <div><b-form-input id="anoFilme" type="number" min="1895" v-model="form.ano" placeholder="Ano de lançamento"></b-form-input></div>
                                <div><b-form-input id="realizadorFilme" v-model="form.realizador" placeholder="Realizador (separados por virgulas)"></b-form-input></div>
                                <div><b-form-input id="produtoraFilme" v-model="form.produtora" placeholder="Produtora"></b-form-input></div>
                                <div><b-form-input id="elencoFilme" v-model="form.elenco" placeholder="Elenco (separados por virgulas)"></b-form-input></div>
                                <div>
                                    <span>
                                        <select v-model="form.categorias[index]" name="selCategoriaFilme" id="selCategoriaFilme" @change="novaCategoriaModal">
                                            <option value="" selected disabled>Género Filme</option>
                                            <option v-for="(categoria, index) in categoriasOrdenadas" :key="index" :value="categoria">{{categoria}}</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                        <b-button variant="outline" @click="form.categorias.pop()" v-if="form.categorias.length > 1 && form.categorias.length == index + 1" class="menosCategoria">x</b-button>
                                    </span>
                                    <b-button @click="addCategoria" >+</b-button>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </form>
        </b-container>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: 'Adicionar Filme',
        data() {
            return {
                form: {
                    nome: '',
                    ano: 1895,
                    realizador: '',
                    produtora: '',
                    elenco: '',
                    categorias: [''],
                    tipo: '',
                    imagem: '',
                    trailer: '',
                    sinopse: '',
                },
            }
        },

        computed: {
            ...mapGetters(['getCategoria', 'isNomeFilmeAvalido', 'isCategoriaAvailable']),

            categoriasOrdenadas(){
                return this.getCategoria.filter((categorias) => categorias == this.filtroCategoria || this.filtroCategoria == '').slice(0).sort(this.ordenarAlfabeticaCategoria);
            },
        },

        methods:{
            ...mapMutations(['SET_NOVO_FILME', 'SET_NOVA_CATEGORIA', 'SET_FILME_ATUAL']),

            addCategoria(){
                this.form.categorias.push('')
            },

            novaCategoriaModal(){
                if(this.form.categorias.find((categoria) => categoria == 'Outros')){
                    this.$refs['novaCategoriaModal'].show()
                }
            },

            NovaCategoria(){
                if(this.novaCategoria.length != 0){
                    if(this.isCategoriaAvailable(this.novaCategoria)){
                        this.SET_NOVA_CATEGORIA(this.novaCategoria)
                        this.$refs['novaCategoriaModal'].hide()
                    }
                    else{
                        alert('Esse categoria já existe')
                    }
                }
            },

            adicionarFilme(){
                let confimarNovoFilme = true

                for (let i in this.form) {
                    if(this.form[i].length === 0){
                        confimarNovoFilme = false;
                        break;
                    }
                }
                for (let i of this.form.categorias){
                    if(i.length === 0 || i == 'Outros'){
                        confimarNovoFilme = false;
                        break;
                    }
                }

                if(confimarNovoFilme){
                    if(this.isNomeFilmeAvalido(this.form.nome)){
                        let realizador = this.form.realizador.split(',');
                        let elenco = this.form.elenco.split(',');
                        let trailer = this.form.trailer.replace('watch?v=', 'embed/');
    
                        let novoFilme = {
                            nome: this.form.nome,
                            imagem: this.form.imagem,
                            trailer: trailer,
                            tipo: this.form.tipo,
                            categoria: this.form.categorias,
                            ano: this.form.ano,
                            realizador: realizador,
                            produtora: this.form.produtora,
                            elenco: elenco,
                            sinopse: this.form.sinopse,
                            avaliacao: 0,
                            nAvaliacoes: 0,
                            comentarios: [],
                        };
    
                        this.SET_NOVO_FILME(novoFilme);
                        this.escolherFilme(this.form.nome)
                    }
                    else{
                        alert('Já existe um filme com esse nome')
                    }
                }
                else{
                    alert('Informação em falta ou invalida!')
                }
            },
        }
    }

    
</script>

<style scoped>
#nomeFilme{
    margin-top:3%;
    margin-bottom:2%;
    height: 45px;
    width: 250px;
}
#imgFilme{
    position: relative;
    width: 140px;
    height: 210px;
    left: 1.2vw;
    bottom: -6.55vh;
    z-index: 1;
    background-color: white;
    color: black;
    border: 1px solid black;
}
#trailer{
    position: relative;
    left:-9.2vw;
    width: 560px;
    height: 315px;
    background-color: white;
    color: black;
}

#anoFilme,
#realizadorFilme,
#produtoraFilme,
#elencoFilme {
    height: 40px;
    width: 150px;
    display: inline;
}

#inputsInfFilme>div{
    margin-bottom: 5px;
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

#removerFilme{
    margin-left: 50px;
    background-color: var(--cor2);
    font-family: var(--font1);
    width:100px;
}

#removerFilme:hover{
    opacity: 90%;
}

#semComentarios{
    font-family: var(--font1);
    text-align: center;
}
</style>