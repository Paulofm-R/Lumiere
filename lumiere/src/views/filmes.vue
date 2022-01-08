<template>
    <div>
        <b-container fluid>
            <h1>CATÁLOGO</h1>
            
            <b-row class="melhorAvaliados" align-h="center">
                <h2>Melhor Avaliados Filmes</h2>
                <b-col cols="2" class="catalogoMelhorAvaliados" v-for="(filme, index) in melhorFilmesAvaliadosOrdenados" :key="index">
                    <div class="card" @click="escolherFilme(filme.nome)">
                        <img :src="filme.imagem" alt="Poster">
                        <span>{{filme.nome}}</span>
                        <span>{{filme.avaliacao}} <b-icon icon="star-fill"></b-icon></span>
                    </div>
                </b-col>
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
            </b-row>

            <div>
                <b-row class="filmesCategorias" v-for="(categoria, index) in categoriasOrdenadas" :key="index" v-model="catalogoSlider[index]">
                    <h2>{{categoria}}</h2> 
                    <div class="carouselFilmes" ref="carousel">
                        <b-col cols="2" class="filme card" v-for="(filme, index) in filmesCatalogo(categoria)" :key="index">
                            <b-img :src="filme.imagem" alt="Poster" class="poster" @click="escolherFilme(filme.nome)"></b-img>
                        </b-col>
                    </div>
                    <b-button v-if="filmesCatalogo(categoria).length > 5" class="setas seta_esquerda" @click="andarEsquerda(index)"><b-icon icon="arrow-left-square"></b-icon></b-button>
                    <b-button v-if="filmesCatalogo(categoria).length > 5" class="setas seta_direita" @click="andarDireita(index)"><b-icon icon="arrow-right-square"></b-icon></b-button>
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
                catalogoSlider: [],
            }
        },

        computed: {
            ...mapGetters(['getFilmes', 'getCategoria']),

            melhorFilmesAvaliadosOrdenados(){
                const filmesOrdenados = this.getFilmes.filter((filme) => filme.tipo == 'Filme').slice(0).sort(this.compararAvaliacoes);

                // Selecionar os 3 
                let filmesMelhoresAvaliados = []
                filmesMelhoresAvaliados.push(filmesOrdenados[2])
                filmesMelhoresAvaliados.push(filmesOrdenados[0])
                filmesMelhoresAvaliados.push(filmesOrdenados[1])

                return filmesMelhoresAvaliados;
            },

            melhorSeriesAvaliadosOrdenados(){
                const filmesOrdenados = this.getFilmes.filter((serie) => serie.tipo == 'Serie').slice(0).sort(this.compararAvaliacoes);

                let filmesMelhoresAvaliados = []
                filmesMelhoresAvaliados.push(filmesOrdenados[2])
                filmesMelhoresAvaliados.push(filmesOrdenados[0])
                filmesMelhoresAvaliados.push(filmesOrdenados[1])

                return filmesMelhoresAvaliados;
            },

            categoriasOrdenadas(){
                return this.getCategoria.slice(0).sort(this.ordenarAlfabeticaCategoria);
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
                return this.getFilmes.filter((filme) => filme.categoria.find((categoria) => categoria == cat)).sort(this.ordenarAlfabeticaFilmes);
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

h2{
    text-align: center;
    font-family: var(--font2);
}

.melhorAvaliados{
    margin: auto;
    margin-top: 10vh;
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
    height: 445px;
    position: relative;
}

.carouselFilmes{
    margin: auto;
    padding: 5px;
    height: 90%;
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