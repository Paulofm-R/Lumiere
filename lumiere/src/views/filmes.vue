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
                <b-row id="filmesCategorias" v-for="(categoria, index) in categoriasOrdenadas" :key="index">
                    <h2>{{categoria}}</h2>
                    <b-carousel 
                        class="carouselFilmes"
                        controls
                        @sliding-start="iniciarSlide"
                        @sliding-end="finalizarSlide">
                        <b-carousel-slide v-for="(filme, index) in filmesCatalogo" :key="index" class="filmeCarousel">
                            <template #img>
                                <img
                                    class="d-block img-fluid w-100"
                                    width="1024"
                                    height="250"
                                    :src="filme.imagem"
                                    alt="image slot"
                                >
                                </template>
                            <h1>{{filme.nome}}</h1>
                        </b-carousel-slide>
                    </b-carousel>
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
                sliding: null,
                slide: 0,
            }
        },

        computed: {
            ...mapGetters(['getFilmes', 'getCategoria']),

            melhorFilmesAvaliadosOrdenados(){
                const filmesOrdenados = this.getFilmes.filter((filme) => filme.tipo == 'Filme').slice(0).sort(this.compararAvaliacoes);

                // Selecionar os 3 
                let filmesMelhoresAvaliados = []
                filmesMelhoresAvaliados.push(filmesOrdenados[filmesOrdenados.length - 3])
                filmesMelhoresAvaliados.push(filmesOrdenados[filmesOrdenados.length - 1])
                filmesMelhoresAvaliados.push(filmesOrdenados[filmesOrdenados.length -2])

                return filmesMelhoresAvaliados;
            },

            melhorSeriesAvaliadosOrdenados(){
                const filmesOrdenados = this.getFilmes.filter((serie) => serie.tipo == 'Serie').slice(0).sort(this.compararAvaliacoes);

                let filmesMelhoresAvaliados = []
                filmesMelhoresAvaliados.push(filmesOrdenados[filmesOrdenados.length - 3])
                filmesMelhoresAvaliados.push(filmesOrdenados[filmesOrdenados.length - 1])
                filmesMelhoresAvaliados.push(filmesOrdenados[filmesOrdenados.length -2])

                return filmesMelhoresAvaliados;
            },

            filmesCatalogo(){
                return this.getFilmes.filter((filme) => filme.categoria.find((categoria) => categoria == 'Aventura')).sort(this.compararAvaliacoes);
            },

            categoriasOrdenadas(){
                return this.getCategoria.slice(0).sort(this.ordenarAlfabetica);
            },
        },

        methods: {
            escolherFilme(nome) {
                this.$router.push({ name: "filme", params:{ filmeNome: nome }});
            },

            compararAvaliacoes(filmeA, filmeB){
                if (filmeA.avaliacao < filmeB.avaliacao) return -1;
                else if (filmeA.avaliacao > filmeB.avaliacao) return 1;
                else return 0;
            },

            ordenarAlfabetica(itemA, itemB){
                if (itemA < itemB) return -1;
                else if (itemA > itemB) return 1;
                else return 0;
            },

            iniciarSlide(){
                this.sliding = true
            },

            finalizarSlide() {
                this.sliding = false
            }
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

#filmesCategorias{
    margin-top: 5vh;
}

.carouselFilmes{
    margin: auto;
}

.filmeCarousel{
    width: 25vw;
}
</style>