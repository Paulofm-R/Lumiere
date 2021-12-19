<template>
    <div>
        <b-contain>
            <h2>JOGOS</h2>
            <b-row align-h="between">
                <b-col cols=4 id="filtro">
                    <select name="filtroJogos" id="filtroJogos">
                        <option value="" default disabled>Filtrar por...</option>
                    </select>
                </b-col>
                <b-col cols=4 id="adminAcoes">
                    <button @click="acaoAdmin = true" v-if="!acaoAdmin">Editar</button>
                    <button v-b-modal="'modalAdicionar'" v-else>Adcionar</button>
                </b-col>
            </b-row>
            <b-row id="catalogoJogos">
                <b-col cols=3 class="catalogoJogo" v-for="(jogo, index) in getJogos" :key="index">
                    <div class="card jogo">
                        <img :src="jogo.img">
                        <h4>{{jogo.nome}}</h4>
                        <input type="image" src="" alt="">
                    </div>
                </b-col>
            </b-row>


            <!-- Modais -->
            <b-modal id="modalAdicionar" centered title="Adcionar">
                <p class="my-4">Hello from modal!</p>
            </b-modal>
        </b-contain> 
    </div>
</template>

<script>
    import { mapGetters} from "vuex";

    export default {
        name: "Jogos",
        
        data() {
            return {
                acaoAdmin: false,
                modalAdcionar: false,
            }
        },

        computed: {
            ...mapGetters(['getJogos']),
        },

        methods: {

        },
    }
</script>

<style scoped>
h2{
    margin-top: 20px;
    text-align: center;
    font-family: var(--font2);
    font-weight: bold;
}

#filtro{
    text-align: center;
}

#filtro > select{
    width: 50%;
}

#adminAcoes{
    text-align: center;
}

#adminAcoes > button{
    width: 150px;
    height: 35px;
    background-color: var(--cor2);
    font-family: var(--font1);
    font-size: 1.25em;
}

#catalogoJogos{
    margin: auto;
    margin-top: 2vh;
    margin-left: 10vw;
    margin-right: 10vw;
}

.catalogoJogo > .jogo{
    margin: auto;
    margin-top: 5vh;
    border: 0px;
    height: 280px;
    width: 180px;
    background-color: var(--cor4);
    color: black;
    font-family: var(--font2);
}

.catalogoJogo > .jogo > img{
    padding:0px;
    width: 100%;
    height: 85%;
}

.catalogoJogo > .jogo > h4{
    font-size: 1.25em;
    text-align: center;
}

#modalAdicionar{
    text-align: center;
}
</style>