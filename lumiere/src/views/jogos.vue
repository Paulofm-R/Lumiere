<template>
    <div>
        <b-container fluid>
            <h2>JOGOS</h2>
            <b-row align-h="between">
                <b-col cols=4 id="filtro">
                    <select name="filtroJogos" id="filtroJogos">
                        <option value="" default disabled>Filtrar por...</option>
                    </select>
                </b-col>
                <b-col cols=4 id="adminAcoes">
                    <button @click="acaoAdmin = true" v-if="!acaoAdmin">Editar</button>
                    <button v-b-modal.adicionarModal v-else>Adcionar</button>
                </b-col>
            </b-row>
            <b-row id="catalogoJogos">
                <b-col cols=3 class="catalogoJogo" v-for="(jogo, index) in getJogos" :key="index">
                    <div class="card jogo">
                        <button v-if="acaoAdmin" class="remover">X</button>
                        <img :src="jogo.img">
                        <h4>{{jogo.nome}}</h4>
                        <input type="image" src="" alt="">
                    </div>
                </b-col>
            </b-row>

            <!-- Modais -->
            <b-modal id="adicionarModal" centered>
                <template>
                    <h5>Adcionar</h5>
                </template>

                <template #default="{ hide }">
                <p>Modal Body with button</p>
                <b-button @click="hide()">Hide Modal</b-button>
                </template>

                <template #modal-footer="{ ok, cancel, hide }">
                <b>Custom Footer</b>
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="sm" variant="success" @click="ok()">
                    OK
                </b-button>
                <b-button size="sm" variant="danger" @click="cancel()">
                    Cancel
                </b-button>
                <!-- Button with custom close trigger value -->
                <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
                    Forget it
                </b-button>
                </template>
            </b-modal>

            <!-- <dialog :open="modalAdcionar">
                <div id="modalCabecalho">
                    ADICIONAR
                    <button>X</button>
                </div>
                <div id="modalCorpo">
                    
                </div>   
            </dialog> -->
        </b-container> 
    </div>
</template>

<script>
    import { mapGetters} from "vuex";

    export default {
        name: "Jogos",
        
        data() {
            return {
                acaoAdmin: false,
                // modalAdcionar: false,
            }
        },

        computed: {
            ...mapGetters(['getJogos']),
        },

        methods: {
            // abrirModal(){
            //     this.modalAdcionar = true;
            // }
        },
    }
</script>

<style scoped>
/* dialog{
    position: absolute;
    top: 45%;
    left: 45%;
} */

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

.catalogoJogo > .jogo > button{
    width: 18%;
    height: 12%;
    background-color: var(--cor2);
    position: absolute;
    right: -15px;
    top: -15px;
    border-radius: 25px;
    border-color: rgba(0, 0, 0, 0.884);
}

.catalogoJogo > .jogo > button:active{
    box-shadow: inset 5px 5px 13px 0px rgba(0, 0, 0, 0.479);
}

.catalogoJogo > .jogo > img{
    padding:0px;
    width: 100%;
    height: 85%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.catalogoJogo > .jogo > h4{
    font-size: 1.25em;
    text-align: center;
}

.modal-header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: calc(0.3rem - 1px);
    border-top-right-radius: calc(0.3rem - 1px);
    margin: auto;
}
</style>