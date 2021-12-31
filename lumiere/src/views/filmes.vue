<template>
    <div>
        <b-container fluid>
            <router-link :to="{name: 'filme'}">Para a Sofia ter acesso a pagina de Filme</router-link>
            <h1>CATÁLOGO</h1>
            
            <b-row id="melhorAvaliados" align-h="center">
                <h2>Filmes Melhor Avaliados</h2>
                <b-col cols="2" class="catalogoMelhorAvaliados" v-for="(filme, index) in getFilmes" :key="index">
                    <div class="card" @click="escolherFilme(filme.nome)">
                        <img :src="filme.imagem" alt="Poster">
                        <span>{{filme.nome}}</span>
                        <span>{{filme.avaliacao}} <b-icon icon="star-fill"></b-icon></span>
                    </div>
                </b-col>
            </b-row>
            
        </b-container>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        nome: 'Filmes',
        data() {
            return {
                
            }
        },

        computed: {
            ...mapGetters(['getFilmes'])
        },

        methods: {
            escolherFilme(nome) {
                this.$router.push({ name: "filme", params:{ filmeNome: nome }});
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

#melhorAvaliados{
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
</style>