<template>
    <div>
        <b-container fluid>
            <h1>CATÁLOGO</h1>

            <b-row align-h="center" id="filtro">
                <b-col cols='3'>
                    <b-form-input v-model="txtNomeFilme" placeholder="Pesquisa..."></b-form-input>
                </b-col>
                <b-col cols='2'>
                    <select name="selectFiltro" id="selectFiltro" v-model="filtroCategoria">
                        <option value="" selected>Todos</option>
                        <option v-for="(categoria, index) in categoriasOrdenadasSelect" :key="index"
                            :value="categoria.categoria">
                            {{ categoria.categoria }}</option>
                    </select>
                </b-col>
            </b-row>

            <b-row v-if="loggedUtilizador && loggedUtilizador.tipo == 'admin'" id="adicionar">
                <b-button id="botaoAdicionar" @click="$router.push({ name: 'adicionarFilme' })">ADICIONAR</b-button>
            </b-row>

            <b-row class="melhorAvaliados" align-h="center">
                <h2>Melhor Avaliados Filmes</h2>
                <b-col cols="2" class="catalogoMelhorAvaliados" v-for="(filme, index) in melhorFilmesAvaliadosOrdenados"
                    :key="index">
                    <div class="card" @click="escolherFilme(filme._id)">
                        <img :src="filme.imagem" alt="Poster">
                        <span>{{ filme.nome }}</span>
                        <span>{{ filme.avaliacao }} <b-icon icon="star-fill"></b-icon></span>
                    </div>
                </b-col>
                <p v-if="melhorFilmesAvaliadosOrdenados.length == 0">Não temos Filmes desta categoria</p>
            </b-row>

            <b-row class="melhorAvaliados" align-h="center">
                <h2>Melhor Avaliados Series</h2>
                <b-col cols="2" class="catalogoMelhorAvaliados" v-for="(serie, index) in melhorSeriesAvaliadosOrdenados"
                    :key="index">
                    <div class="card" @click="escolherFilme(serie._id)">
                        <img :src="serie.imagem" alt="Poster">
                        <span>{{ serie.nome }}</span>
                        <span>{{ serie.avaliacao }} <b-icon icon="star-fill"></b-icon></span>
                    </div>
                </b-col>
                <p v-if="melhorSeriesAvaliadosOrdenados.length == 0">Não temos Series desta categoria</p>
            </b-row>

            <div>
                <b-row class="filmesCategorias" v-for="(categoria, index) in categoriasOrdenadas" :key="index">
                    <div v-if="filmesCatalogo(categoria.categoria).length > 0">
                        <h2>{{ categoria.categoria }}</h2>
                        <div class="carouselFilmes" ref="carousel">
                            <b-col cols="2" class="filme card"
                                v-for="(filme, index) in filmesCatalogo(categoria.categoria)" :key="index">
                                <b-img :src="filme.imagem" alt="Poster" class="poster"
                                    @click="escolherFilme(filme._id)"></b-img>
                            </b-col>
                        </div>
                        <b-button v-if="filmesCatalogo(categoria.categoria).length > 5" class="setas seta_esquerda"
                            @click="andarEsquerda(index)">
                            <b-icon icon="arrow-left-square"></b-icon>
                        </b-button>
                        <b-button v-if="filmesCatalogo(categoria.categoria).length > 5" class="setas seta_direita"
                            @click="andarDireita(index)">
                            <b-icon icon="arrow-right-square"></b-icon>
                        </b-button>
                    </div>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    name: 'PaginaFilmes',
    data() {
        return {
            txtNomeFilme: '',
            filtroCategoria: '',

            message: "",
            filmes: [],
            categorias: [],

            loggedUtilizador: null
        }
    },

    computed: {
        ...mapGetters(['getFilmes', 'getCategoria', 'getLoggedUser', 'isNomeFilmeAvalido', 'isCategoriaAvailable', 'getUtilizador']),

        melhorFilmesAvaliadosOrdenados() {
            const filmesOrdenados = this.filmes.filter((filme) => filme.tipo == 'Filme' && (filme.nome.includes(this.txtNomeFilme) || filme.elenco.find((ator) => ator === this.txtNomeFilme)) && (filme.categoria.find((categoria) => categoria == this.filtroCategoria) || this.filtroCategoria == '')).slice(0).sort(this.compararAvaliacoes);

            // Selecionar os 3 mais avaliados
            let filmesMelhoresAvaliados = []
            if (filmesOrdenados.length > 2) {
                filmesMelhoresAvaliados.push(filmesOrdenados[2])
                filmesMelhoresAvaliados.push(filmesOrdenados[0])
                filmesMelhoresAvaliados.push(filmesOrdenados[1])
            }
            else {
                for (let i of filmesOrdenados) {
                    filmesMelhoresAvaliados.push(i)
                }
            }

            return filmesMelhoresAvaliados;
        },

        melhorSeriesAvaliadosOrdenados() {
            const seriesOrdenados = this.filmes.filter((serie) => serie.tipo == 'Serie' && (serie.nome.includes(this.txtNomeFilme) || serie.elenco.find((ator) => ator === this.txtNomeFilme)) && (serie.categoria.find((categoria) => categoria == this.filtroCategoria) || this.filtroCategoria == '')).slice(0).sort(this.compararAvaliacoes);

            // Selecionar os 3 mais avaliados
            let seriesMelhoresAvaliados = []
            if (seriesOrdenados.length > 2) {
                seriesMelhoresAvaliados.push(seriesOrdenados[2])
                seriesMelhoresAvaliados.push(seriesOrdenados[0])
                seriesMelhoresAvaliados.push(seriesOrdenados[1])
            }
            else {
                for (let i of seriesOrdenados) {
                    seriesMelhoresAvaliados.push(i)
                }
            }

            return seriesMelhoresAvaliados;
        },

        categoriasOrdenadasSelect() {
            return this.categorias.slice(0).sort(this.ordenarAlfabeticaCategoria);
        },

        categoriasOrdenadas() {
            return this.categorias.filter((categorias) => categorias.categoria == this.filtroCategoria || this.filtroCategoria == '').slice(0).sort(this.ordenarAlfabeticaCategoria);
        },
    },

    methods: {
        ...mapMutations(['SET_NOVO_FILME', 'SET_NOVA_CATEGORIA', 'SET_FILME']),

        async getLoggedUserInfo() {
            try {
                let utilizador = await this.getLoggedUser
                await this.$store.dispatch("getUtilizador", utilizador.id);
                this.loggedUtilizador = await this.getUtilizador;
            } catch (error) {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            } finally {
                this.loading = false;
            }
        },

        async getListaFilmes() {
            try {
                await this.$store.dispatch("getAllFilmes");
                this.filmes = this.getFilmes;
            }
            catch (error) {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        },

        async getListaCategorias() {
            try {
                await this.$store.dispatch("getAllCategorias");
                this.categorias = this.getCategoria;
            }
            catch (error) {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        },

        escolherFilme(id) {
            // this.SET_FILME(id);
            this.$router.push({ name: "filme", params: { filmeID: id } });
        },

        compararAvaliacoes(filmeA, filmeB) {
            if (filmeA.avaliacao < filmeB.avaliacao) return 1;
            else if (filmeA.avaliacao > filmeB.avaliacao) return -1;
            else return 0;
        },

        ordenarAlfabeticaCategoria(categoriaA, categoriaB) {
            if (categoriaA.categoria < categoriaB.categoria) return -1;
            else if (categoriaA.categoria > categoriaB.categoria) return 1;
            else return 0;
        },

        ordenarAlfabeticaFilmes(filmeA, filmeB) {
            if (filmeA.nome < filmeB.nome) return -1;
            else if (filmeA.nome > filmeB.nome) return 1;
            else return 0;
        },

        filmesCatalogo(cat) {
            return this.filmes.filter((filme) => filme.categoria.find((categoria) => categoria == cat) && (filme.nome.includes(this.txtNomeFilme) || filme.elenco.find((ator) => ator === this.txtNomeFilme))).sort(this.ordenarAlfabeticaFilmes);
        },

        andarEsquerda(index) {
            this.$refs.carousel[index].scrollBy(-300, 0)
        },

        andarDireita(index) {
            console.log(index);
            this.$refs.carousel[index].scrollBy(300, 0)
        },

    },

    mounted() {
        this.getListaFilmes();
        this.getListaCategorias();
        if (this.getLoggedUser !== null) {
            this.getLoggedUserInfo();
        }
    },
}
</script>

<style scoped>
h1 {
    margin-top: 20px;
    margin-bottom: 5vh;
    text-align: center;
    font-family: var(--font2);
}

#selectFiltro {
    width: 75%;
    height: 100%;
    border-radius: 0.25em;
}

#adicionar {
    margin: auto;
    margin-top: 5vh;
    width: 175px;
    height: 43px;
}

#botaoAdicionar {
    border-radius: 10px;
    background-color: var(--cor2);
    opacity: 90%;
    color: black;
}

#botaoAdicionar:hover {
    opacity: 100%;
}

#botaoAdicionar:active {
    box-shadow: inset 5px 5px 13px 0px rgba(0, 0, 0, 0.479);
}

h2 {
    text-align: center;
    font-family: var(--font2);
}

.melhorAvaliados {
    margin: auto;
    margin-top: 10vh;
    text-align: center;
}

.melhorAvaliados>p {
    font-family: var(--font1);
    font-size: 1.25em;
    padding-top: 25px;
}

.catalogoMelhorAvaliados {
    margin-left: 10px;
    margin-top: 3vh;
    height: 395px;
    width: 235px;
    opacity: 90%;
}

.catalogoMelhorAvaliados:hover {
    cursor: pointer;
    opacity: 100%;
}

.catalogoMelhorAvaliados:nth-child(3) {
    margin-top: 1vh;
    height: 425px;
    width: 245px;
}

.catalogoMelhorAvaliados>.card {
    height: 100%;
    width: 100%;
    background-color: rgba(255, 0, 0, 0);
}

.card>img {
    height: 91%;
    width: 100%;
}

.filmesCategorias {
    margin-top: 10vh;
    max-width: 100vw;
    position: relative;
}

.carouselFilmes {
    margin: auto;
    padding: 5px;
    height: 400.5px;
    display: flex;
    overflow-x: hidden;
}

.setas {
    width: 45px;
    height: 50px;
    background-color: rgba(211, 211, 211, 0.350);
    border-color: transparent;
}

.setas:hover {
    background-color: rgba(211, 211, 211, 0.650);
}

.seta_esquerda {
    position: absolute;
    top: 45%;
}

.seta_direita {
    position: absolute;
    top: 45%;
    right: 0;
}

.carouselFilmes>.card {
    width: 225px;
    height: 95%;
    margin: 10px;
    padding: 0px;
    border: 1px solid var(--cor1);
    opacity: 90%;
}

.carouselFilmes>.card:hover {
    cursor: pointer;
    opacity: 100%;
}

.carouselFilmes>.card>.poster {
    width: 100%;
    height: 100%
}

.modalTitulo {
    margin: auto;
    font-family: var(--font2);
    color: white;
}

.fecharModal {
    position: absolute;
    right: 5px;
    top: 0px;
    color: white;
}

#ficheiros,
#sinopse {
    text-align: center;
    font-family: var(--font1);
}

#adicionarFicheiros {
    width: 187px;
    height: 135px;
    font-size: 2em;
}

#sinopse {
    margin-top: 5%;
}

.categoriaFilme {
    position: relative;
    padding: 0;
    padding-left: 12px;
}

.categoriaFilme>.menosCategoria {
    position: absolute;
    top: -13px;
    right: -8.5px;
    width: 20px;
    height: 20px;
    color: black;
    padding: 0px;
    /* padding-bottom: 20px;  */
    font-family: var(--font2);
}

#maisCategoria {
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