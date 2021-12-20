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
                    <button v-b-modal = "'adicionarModal'" v-else>Adcionar</button>
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
            <b-modal id="adicionarModal" centered
                header-bg-variant="primary"
                header-text-variant="light"
                body-bg-variant="info"
                footer-bg-variant="info">
                <template #modal-header="{close}">
                    <b-col cols=11 style="text-align: center; padding-left: 30px">
                        <h4>Adicionar Jogo</h4>
                    </b-col>
                    <b-col style="text-align: right">
                        <b-button @click="close" variant="primary" style="font-size: 2em; position: relative; top: -15px;" >x</b-button>
                    </b-col>
                </template>
                <template>
                    <b-row>
                        <b-col cols="4">
                            <b-button variant="light" style="height: 65%; width:75%; margin-top: 15%;">Foto Jogo <br>X</b-button>
                        </b-col>
                        <b-col cols="8">
                            <b-form @submit.prevent="addJogo">
                                <div class="form-group">
                                  <label for="txtNome">Nome</label>
                                  <input type="text"
                                    class="form-control" name="txtNome" id="txtNome" placeholder="Nome do Jogo">
                                </div>
                                <div class="form-group">
                                  <label for="selectTipoJogo">Tipo de Jogo</label>
                                  <select class="form-control" name="" id="">
                                    <option disabled>--Selecione o tipo de jogo--</option>
                                    <option v-for="(tipo, index) in getTipoJogo" :key="index" :value="tipo">{{tipo}}</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="txtNome">Questões</label>
                                  <input type="text"
                                    class="form-control" name="txtNome" id="txtNome" placeholder="Separadas por virgula">
                                </div>
                                <div class="form-group">
                                  <label for="txtNome">Anexos</label>
                                  <input type="url"
                                    class="form-control" name="txtNome" id="txtNome" placeholder="Separadas por virgula">
                                </div>
                            </b-form>
                        </b-col>
                    </b-row>
                </template>
                <template #modal-footer>
                    <div style="margin: auto">
                        <b-button variant="primary" @click="addJogo()">ADICIONAR</b-button>
                    </div>
                </template>
            </b-modal> 
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
            }
        },

        computed: {
            ...mapGetters(['getJogos', 'getTipoJogo']),
        },

        methods: {
            addJogo(){
                
            }
        },
    }
</script>

<style>
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

#adicionarModal > #modalCabecalho{
    margin-top:auto;
}
</style>