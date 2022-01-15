<template>
    <div>
        <b-container fluid>
            <h1>CATÁLOGO</h1>
            
            <b-row align-h="center" id="filtro">
                <b-col cols='3'>
                    <b-form-input v-model="txtNomeFilme" placeholder="Enter your name"></b-form-input>
                </b-col>
                <b-col cols='2'>
                    <select name="selectFiltro" id="selectFiltro" v-model="filtroCategoria">
                        <option value="" selected>Todos</option>
                        <option v-for="(categoria, index) in getCategoria" :key="index" :value="categoria">{{categoria}}</option>
                    </select>
                </b-col>
            </b-row>

            <b-row v-if="getLoggedUser.tipo == 'admin'" id="adicionar">
                <b-button id="botaoAdicionar" v-b-modal="'adicionarFilme'">ADICIONAR</b-button>
            </b-row>

            <b-row class="melhorAvaliados" align-h="center">
                <h2>Melhor Avaliados Filmes</h2>
                <b-col cols="2" class="catalogoMelhorAvaliados" v-for="(filme, index) in melhorFilmesAvaliadosOrdenados" :key="index">
                    <div class="card" @click="escolherFilme(filme.nome)">
                        <img :src="filme.imagem" alt="Poster">
                        <span>{{filme.nome}}</span>
                        <span>{{filme.avaliacao}} <b-icon icon="star-fill"></b-icon></span>
                    </div>
                </b-col>
                <p v-if="melhorFilmesAvaliadosOrdenados.length == 0">Não temos Filmes desta categoria</p>
            </b-row>

            <b-row class="melhorAvaliados" align-h="center">
                <h2>Melhor Avaliados Series</h2>
                <b-col cols="2" class="catalogoMelhorAvaliados" v-for="(serie, index) in melhorSeriesAvaliadosOrdenados" :key="index">
                    <div class="card" @click="escolherFilme(serie.nome)">
                        <img :src="serie.imagem" alt="Poster">
                        <span>{{serie.nome}}</span>
                        <span>{{serie.avaliacao}} <b-icon icon="star-fill"></b-icon></span>
                    </div>
                </b-col>
                <p v-if="melhorSeriesAvaliadosOrdenados.length == 0">Não temos Series desta categoria</p>
            </b-row>

            <div>
                <b-row class="filmesCategorias" v-for="(categoria, index) in categoriasOrdenadas" :key="index">
                    <div v-if="filmesCatalogo(categoria).length > 0">
                        <h2>{{categoria}}</h2>
                        <div class="carouselFilmes" ref="carousel">
                            <b-col cols="2" class="filme card" v-for="(filme, index) in filmesCatalogo(categoria)" :key="index">
                                <b-img :src="filme.imagem" alt="Poster" class="poster" @click="escolherFilme(filme.nome)"></b-img>
                            </b-col>
                        </div>
                        <b-button v-if="filmesCatalogo(categoria).length > 5" class="setas seta_esquerda" @click="andarEsquerda(index)"><b-icon icon="arrow-left-square"></b-icon></b-button>
                        <b-button v-if="filmesCatalogo(categoria).length > 5" class="setas seta_direita" @click="andarDireita(index)"><b-icon icon="arrow-right-square"></b-icon></b-button>
                    </div>
                </b-row>
            </div>

            <!-- Modais -->
            <b-modal id="adicionarFilme" centered
                header-bg-variant="info"
                body-bg-variant="light"
                footer-bg-variant="light"
                size="lg" 
                ok-only>
                <template #modal-header="{close}">
                    <h4 class="modalTitulo">Adicionar Filme/Série</h4>
                    <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                </template>
                <template>
                    <form @submit.prevent="adicionarFilme">
                        <b-row>
                            <b-col cols="4">
                                <div id="ficheiros">
                                    <b-button variant="outline-secondary" id="adicionarFicheiros" v-b-modal="'ficheirosModal'">+</b-button>
                                    <br>
                                    <label for="ficheiros">Adicionar Ficheiros</label>
                                </div>
                                <div id="sinopse">
                                    <b-form-textarea id="textareaSinopse" placeholder="Sinopse do Filme/Serie" rows="5" v-model="form.sinopse"></b-form-textarea>
                                    <label for="textareaSinopse">Sinopse</label>
                                </div>
                            </b-col>
                            <b-col>
                                <b-row class="mb-2">
                                    <b-col cols="2">
                                        <label for="nomeFilme">Nome:</label>
                                    </b-col>
                                    <b-col>
                                        <b-form-input id="nomeFilme" v-model="form.nome" placeholder="Nome do Filme/Serie"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mb-2">
                                    <b-col cols="2">
                                        <label for="anoFilme">Ano:</label>
                                    </b-col>
                                    <b-col>
                                        <b-form-input id="anoFilme" type="number" min="1895" v-model="form.ano" placeholder="Ano de lançamento"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mb-2">
                                    <b-col cols="2">
                                        <label for="realizadorFilme">Realizador:</label>
                                    </b-col>
                                    <b-col>
                                        <b-form-input id="realizadorFilme" v-model="form.realizador" placeholder="Realizador"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mb-2">
                                    <b-col cols="2">
                                        <label for="produtoraFilme">Produtora:</label>
                                    </b-col>
                                    <b-col>
                                        <b-form-input id="produtoraFilme" v-model="form.produtora" placeholder="Produtora (serapados pos virgula)"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mb-2">
                                    <b-col cols="2">
                                        <label for="elencoFilme">Elenco:</label>
                                    </b-col>
                                    <b-col>
                                        <b-form-input id="elencoFilme" v-model="form.elenco" placeholder="Elenco (serapados pos virgula)"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mb-2">
                                    <b-col cols="2">
                                        <label for="selCategoriaFilme">Género:</label>
                                    </b-col>
                                    <b-col v-for="(categoria, index) in form.categorias" :key="index" class="categoriaFilme">
                                        <select v-model="form.categorias[index]" name="selCategoriaFilme" id="selCategoriaFilme" @change="novaCategoriaModal">
                                            <option value="" selected disabled>Género Filme</option>
                                            <option v-for="(categoria, index) in categoriasOrdenadas" :key="index" :value="categoria">{{categoria}}</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                    </b-col>
                                    <b-col cols="1" v-if="form.categorias.length < 3" id="maisCategoria">
                                        <b-button @click="addCategoria" >+</b-button>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="2">
                                        <label for="selTipoFilme">Tipo:</label>
                                    </b-col>
                                    <b-col>
                                        <select v-model="form.tipo" name="selTipoFilme" id="selTipoFilme">
                                            <option value="" selected disabled>Tipo Filme</option>
                                            <option value="Filme">Filme</option>
                                            <option value="Serie">Serie</option>
                                        </select>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </form>
                </template>
                <template #modal-footer>
                    <b-button variant="primary" @click='adicionarFilme'>Adicionar</b-button>
                </template>
            </b-modal>

             <!--Modal para adicionar ficheiros-->
             <b-modal id="ficheirosModal" centered
                header-bg-variant="info"
                body-bg-variant="light"
                footer-bg-variant="light" 
                ok-only>
                <template #modal-header="{close}">
                    <b-col cols=11 class="modalTitulo" >
                        <h4>Ficheiros do filme</h4>
                    </b-col>
                    <b-col style="text-align: right">
                        <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                    </b-col>
                </template>
                <template>
                    <div>
                        <label for="urlImagemFilme">URL da imagem</label>
                        <b-form-input v-model="form.imagem" id="urlImagemFilme" type="url" class="mb-2"></b-form-input>
                    </div>
                    <div>
                        <label for="urlTrailerFilme">URL do trailer</label>
                        <b-form-input v-model="form.trailer" id="urlTrailerFilme" type="url"></b-form-input>
                    </div>
                </template>
                <template #modal-footer="{close}">
                    <b-button variant="primary" @click="close">Guardar</b-button>
                </template>
            </b-modal>

            <!--Modal para adicionar nova categoria-->
             <b-modal ref="novaCategoriaModal" id="novaCategoriaModal" size="sm"
                header-bg-variant="info"
                body-bg-variant="light"
                footer-bg-variant="light" 
                ok-only>
                <template #modal-header="{close}">
                    <b-col cols=11 class="modalTitulo" >
                        <h4>Nova Categoria</h4>
                    </b-col>
                    <b-col style="text-align: right">
                        <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                    </b-col>
                </template>
                <template>
                    <label for="novaCategoria">Nova Categoria</label>
                    <b-form-input v-model="novaCategoria" id="novaCategoria" type="text"></b-form-input>
                </template>
                <template #modal-footer>
                    <b-button variant="primary" @click="NovaCategoria">Guardar</b-button>
                </template>
            </b-modal> 
        </b-container>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: 'Filmes',
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
                txtNomeFilme: '',
                filtroCategoria: '',
                novaCategoria: '',
            }
        },

        computed: {
            ...mapGetters(['getFilmes', 'getCategoria', 'getLoggedUser', 'isNomeFilmeAvalido', 'isCategoriaAvailable']),

            melhorFilmesAvaliadosOrdenados(){
                const filmesOrdenados = this.getFilmes.filter((filme) => filme.tipo == 'Filme' && (filme.nome.includes(this.txtNomeFilme)) && (filme.categoria.find((categoria) => categoria == this.filtroCategoria) || this.filtroCategoria == '')).slice(0).sort(this.compararAvaliacoes);

                // Selecionar os 3 mais avaliados
                let filmesMelhoresAvaliados = []
                if (filmesOrdenados.length > 2){
                    filmesMelhoresAvaliados.push(filmesOrdenados[2])
                    filmesMelhoresAvaliados.push(filmesOrdenados[0])
                    filmesMelhoresAvaliados.push(filmesOrdenados[1])
                }
                else{
                    for(let i of filmesOrdenados){
                        filmesMelhoresAvaliados.push(i)
                    }
                }

                return filmesMelhoresAvaliados;
            },

            melhorSeriesAvaliadosOrdenados(){
                const seriesOrdenados = this.getFilmes.filter((serie) => serie.tipo == 'Serie' && serie.nome.includes(this.txtNomeFilme) && (serie.categoria.find((categoria) => categoria == this.filtroCategoria) || this.filtroCategoria == '')).slice(0).sort(this.compararAvaliacoes);

                // Selecionar os 3 mais avaliados
                let seriesMelhoresAvaliados = []
                if(seriesOrdenados.length > 2){
                    seriesMelhoresAvaliados.push(seriesOrdenados[2])
                    seriesMelhoresAvaliados.push(seriesOrdenados[0])
                    seriesMelhoresAvaliados.push(seriesOrdenados[1])
                }
                else{
                    for(let i of seriesOrdenados){
                        seriesMelhoresAvaliados.push(i)
                    }
                }

                return seriesMelhoresAvaliados;
            },

            categoriasOrdenadas(){
                return this.getCategoria.filter((categorias) => categorias == this.filtroCategoria || this.filtroCategoria == '').slice(0).sort(this.ordenarAlfabeticaCategoria);
            },
        },

        methods: {
            ...mapMutations(['SET_NOVO_FILME', 'SET_NOVA_CATEGORIA']),

            addCategoria(){
                this.form.categorias.push('')
            },

            novaCategoriaModal(){
                if(this.form.categorias.find((categoria) => categoria == 'Outros')){
                    this.$refs['novaCategoriaModal'].show()
                }
            },

            NovaCategoria(){
                if(this.isCategoriaAvailable(this.novaCategoria)){
                    this.SET_NOVA_CATEGORIA(this.novaCategoria)
                    this.$refs['novaCategoriaModal'].hide()
                }
                else{
                    alert('Esse categoria já existe')
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

            escolherFilme(nome) {
                this.$router.push({ name: "filme", params:{ filmeNome: nome }});
            },

            compararAvaliacoes(filmeA, filmeB){
                if (filmeA.avaliacao < filmeB.avaliacao) return 1;
                else if (filmeA.avaliacao > filmeB.avaliacao) return -1;
                else return 0;
            },

            ordenarAlfabeticaCategoria(categoriaA, categoriaB){
                if (categoriaA < categoriaB) return -1;
                else if (categoriaA > categoriaB) return 1;
                else return 0;
            },

            ordenarAlfabeticaFilmes(filmeA, filmeB){
                if (filmeA.nome < filmeB.nome) return -1;
                else if (filmeA.nome > filmeB.nome) return 1;
                else return 0;
            },

            filmesCatalogo(cat){
                return this.getFilmes.filter((filme) => filme.categoria.find((categoria) => categoria == cat) && filme.nome.includes(this.txtNomeFilme)).sort(this.ordenarAlfabeticaFilmes);
            },

            andarEsquerda(index){
                this.$refs.carousel[index].scrollBy(-300, 0)
            },

            andarDireita(index){
                this.$refs.carousel[index].scrollBy(300, 0)
            },

        },
    }
</script>

<style scoped>
h1{
    margin-top: 20px;
    text-align: center;
    font-family: var(--font2);
}

#selectFiltro{
    width: 75%;
    height: 100%;
    border-radius: 0.25em;
}

#adicionar{
    margin: auto;
    margin-top: 5vh;
    width: 175px;
    height: 43px;
}

#botaoAdicionar{
    border-radius: 10px;
    background-color: var(--cor2);
    opacity: 90%;
    color: black;
}

#botaoAdicionar:hover{
    opacity: 100%;
}

#botaoAdicionar:active{
    box-shadow: inset 5px 5px 13px 0px rgba(0, 0, 0, 0.479);
}

h2{
    text-align: center;
    font-family: var(--font2);
}

.melhorAvaliados{
    margin: auto;
    margin-top: 10vh;
    text-align: center;
}

.melhorAvaliados > p{
    font-family: var(--font1);
    font-size: 1.25em;
    padding-top: 25px;
}

.catalogoMelhorAvaliados{
    margin-left: 10px;
    margin-top: 3vh;
    height: 395px;
    width: 235px;
    opacity: 90%;
}

.catalogoMelhorAvaliados:hover{
    cursor: pointer;
    opacity: 100%;
}

.catalogoMelhorAvaliados:nth-child(3) {
    margin-top: 1vh;
    height: 425px;
    width: 245px;
}

.catalogoMelhorAvaliados > .card{
    height: 100%;
    width: 100%;
    background-color: var(--cor0);
}

.card > img{
    height: 91.25%;
    width: 100%;
}

.filmesCategorias{
    margin-top: 10vh;
    max-width: 100vw;
    position: relative;
}

.carouselFilmes{
    margin: auto;
    padding: 5px;
    height: 400.5px;
    display: flex;
    overflow-x: hidden;
}

.setas{
    width: 45px;
    height: 50px;
    background-color: rgba(211, 211, 211, 0.350);
    border-color: transparent;
}

.setas:hover{
    background-color: rgba(211, 211, 211, 0.650); 
}

.seta_esquerda{
    position: absolute;
    top: 45%;
}

.seta_direita{
    position: absolute;
    top: 45%;
    right: 0;
}

.carouselFilmes > .card{
    width: 225px;
    height: 95%;
    margin: 10px;
    padding: 0px;
    background-color: var(--cor1);
    border: 1px solid var(--cor1);
    opacity: 90%;
}

.carouselFilmes > .card:hover{
    cursor: pointer;
    opacity: 100%;
}

.carouselFilmes > .card > .poster{
    width: 100%;
    height: 100%
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

#ficheiros,
#sinopse{
    text-align: center;
    font-family: var(--font1);
}

#adicionarFicheiros{
    width: 187px;
    height: 135px;
    font-size: 2em;
}

#sinopse{
    margin-top: 5%;
}

.categoriaFilme{
    padding: 0;
    padding-left:12px;
}

#maisCategoria{
    padding: 0;
    padding-left: 5px
}

#selCategoriaFilme,
#selTipoFilme {
    width: 100%;
    height: 38px;
    border-color: lightgray;
    border-radius: 0.25em;
}
</style>