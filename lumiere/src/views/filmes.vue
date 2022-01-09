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
        </b-container>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'Filmes',
        data() {
            return {
                txtNomeFilme: '',
                filtroCategoria: '',
            }
        },

        computed: {
            ...mapGetters(['getFilmes', 'getCategoria']),

            melhorFilmesAvaliadosOrdenados(){
                const filmesOrdenados = this.getFilmes.filter((filme) => filme.tipo == 'Filme' && filme.nome.includes(this.txtNomeFilme) && (filme.categoria.find((categoria) => categoria == this.filtroCategoria) || this.filtroCategoria == '')).slice(0).sort(this.compararAvaliacoes);

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

                console.log(filmesMelhoresAvaliados.length);
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

                console.log(seriesMelhoresAvaliados.length);
                return seriesMelhoresAvaliados;
            },

            categoriasOrdenadas(){
                return this.getCategoria.filter((categorias) => categorias == this.filtroCategoria || this.filtroCategoria == '').slice(0).sort(this.ordenarAlfabeticaCategoria);
            },
        },

        methods: {
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
                this.$refs.carousel[index].scrollBy(-100, 0)
            },

            andarDireita(index){
                this.$refs.carousel[index].scrollBy(100, 0)
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
    opacity: 100%;
}

.carouselFilmes > .card > .poster{
    width: 100%;
    height: 100%
}
</style>