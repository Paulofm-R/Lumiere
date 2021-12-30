<template>
    <div>
        <b-container fluid>
            <h1>CATÁLOGO</h1>

            <router-link :to="{name: 'filme'}">Para a Sofia ter acesso a pagina de Filme</router-link>
            
            <b-row id="melhorAvaliados">
                <h2>Filmes Melhor Avaliados</h2>
                <div class="card" v-for="(filme, index) in getFilmes" :key="index">
                    <img :src="filme.imagem" alt="Poster">
                    <span>{{filme.nome}}</span><br>
                    <span>{{filme.avaliacao}}</span>
                </div>
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

.card{
    height: 400px;
    width: 235px;
    margin: auto;
    background-color: var(--cor0);
}

.card > img{
    height: 365px;
    width: 100%;
}
</style>