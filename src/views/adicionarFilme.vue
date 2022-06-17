<template>
    <div>
        <b-container fluid>
            <h1>Adicionar Novo Filme</h1>
            <form @submit.prevent='adicionarFilme'>
                <div>
                    <b-form-input id="nomeFilme" v-model="form.nome" placeholder="Nome do Filme/Serie"></b-form-input>
                </div>
                <div id="imgFilme">
                    <b-button v-if="form.imagem == ''" class="imgFilme" v-b-modal="'ficheirosModalPoster'">Poster do
                        Filme +</b-button>
                    <img v-else type="image" :src="form.imagem" class="imgFilme" alt="poster do filme"
                        v-b-modal="'ficheirosModalPoster'">
                </div>
                <div id="trailer">
                    <b-button v-if="form.trailer == ''" class="trailer" v-b-modal="'ficheirosModalTrailer'">Trailer do
                        Filme +</b-button>
                    <div v-else class="trailer">
                        <b-button id="trocarTrailer" v-b-modal="'ficheirosModalTrailer'">
                            <b-icon icon="arrow-left-right" aria-hidden="true"></b-icon>
                        </b-button>
                        <iframe width="560" height="315" :src="form.trailer" title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen v-b-modal="'ficheirosModalTrailer'"></iframe>
                    </div>
                </div>
                <b-col cols="7">
                    <div class="infoFilme">
                        <p><span>Sinopse: </span>
                            <b-form-textarea id="textareaSinopse" placeholder="Sinopse do Filme/Serie" rows="5"
                                v-model="form.sinopse"></b-form-textarea>
                        </p>

                        <b-row>
                            <b-col cols="2">
                                <p><span>Ano: </span></p>
                                <p><span>Realizador: </span></p>
                                <p><span>Produtora: </span></p>
                                <p><span>Elenco: </span></p>
                                <p><span>Género: </span></p>
                                <p><span>Tipo: </span></p>
                                <p><span>Classificações: </span></p>
                            </b-col>
                            <b-col cols="10" id="inputsInfFilme">
                                <div>
                                    <b-form-input id="anoFilme" type="number" min="1895" v-model="form.ano"
                                        placeholder="Ano de lançamento"></b-form-input>
                                </div>
                                <div>
                                    <b-form-input id="realizadorFilme" v-model="form.realizador"
                                        placeholder="Realizador (ex:realizador1,realizador2,...)"></b-form-input>
                                </div>
                                <div>
                                    <b-form-input id="produtoraFilme" v-model="form.produtora" placeholder="Produtora">
                                    </b-form-input>
                                </div>
                                <div>
                                    <b-form-input id="elencoFilme" v-model="form.elenco"
                                        placeholder="Elenco (ex:ator1,ator2,...)"></b-form-input>
                                </div>
                                <div>
                                    <span v-for="(categoria, index) in form.categorias" :key="index"
                                        class="categoriaFilme">
                                        <select v-model="form.categorias[index]" name="selCategoriaFilme"
                                            id="selCategoriaFilme" @change="novaCategoriaModal">
                                            <option value="" selected disabled>Género Filme</option>
                                            <option v-for="(categoria, index) in categoriasOrdenadas" :key="index"
                                                :value="categoria">{{ categoria }}</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                        <b-button variant="outline" @click="form.categorias.pop()"
                                            v-if="form.categorias.length > 1 && form.categorias.length == index + 1"
                                            class="menosCategoria">x</b-button>
                                    </span>
                                    <b-button v-if="form.categorias.length < 3" @click="addCategoria"
                                        id="addCategoriaId">+</b-button>
                                </div>
                                <div>
                                    <select v-model="form.tipo" name="selTipoFilme" id="selTipoFilme">
                                        <option value="" selected disabled>Tipo Filme</option>
                                        <option value="Filme">Filme</option>
                                        <option value="Serie">Serie</option>
                                    </select>
                                </div>
                                <div>
                                    <select v-model="form.classificacao" name="selClassificacaoFilme"
                                        id="selClassificacaoFilme">
                                        <option value="" selected disabled>Classificação do Filme</option>
                                        <option value="M/3">M/3</option>
                                        <option value="M/6">M/6</option>
                                        <option value="M/12">M/12</option>
                                        <option value="M/14">M/14</option>
                                        <option value="M/16">M/16</option>
                                        <option value="M/18">M/18</option>
                                    </select>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <input id="btnAdicionarFilme" type="submit" value="Adicionar Filme">
            </form>

            <!-- Modais -->
            <!--Modal para adicionar nova categoria-->
            <b-modal ref="novaCategoriaModal" id="novaCategoriaModal" size="sm" header-bg-variant="info"
                body-bg-variant="light" footer-bg-variant="light" ok-only>
                <template #modal-header="{ close }">
                    <h4 class="modalTitulo">Nova Categoria</h4>
                    <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                </template>
                <template>
                    <label for="novaCategoria">Nova Categoria</label>
                    <b-form-input v-model="novaCategoria" id="novaCategoria" type="text"></b-form-input>
                </template>
                <template #modal-footer>
                    <b-button variant="primary" @click="NovaCategoria">Guardar</b-button>
                </template>
            </b-modal>

            <!--Modal para adicionar ficheiros-->
            <!-- Poster -->
            <b-modal id="ficheirosModalPoster" header-bg-variant="info" body-bg-variant="light"
                footer-bg-variant="light" ok-only>
                <template #modal-header="{ close }">
                    <b-col cols=11 class="modalTitulo">
                        <h4>Poster do Filme</h4>
                    </b-col>
                    <b-col style="text-align: right">
                        <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                    </b-col>
                </template>
                <template>
                    <label for="urlImagemFilme">URL da imagem</label>
                    <b-form-input v-model="form.imagem" id="urlImagemFilme" type="url" class="mb-2"></b-form-input>
                </template>
                <template #modal-footer="{ close }">
                    <b-button variant="primary" @click="close">Guardar</b-button>
                </template>
            </b-modal>

            <!-- Trailer -->
            <b-modal id="ficheirosModalTrailer" ref="ficheirosModalTrailer" header-bg-variant="info"
                body-bg-variant="light" footer-bg-variant="light" ok-only>
                <template #modal-header="{ close }">
                    <b-col cols=11 class="modalTitulo">
                        <h4>Poster do Filme</h4>
                    </b-col>
                    <b-col style="text-align: right">
                        <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                    </b-col>
                </template>
                <template>
                    <label for="urlTrailerFilme">URL do trailer</label>
                    <b-form-input v-model="trailerURL" id="urlTrailerFilme" type="url" placeholder="Link do Youtube">
                    </b-form-input>
                </template>
                <template #modal-footer>
                    <b-button variant="primary" @click="trailerFilme">Guardar</b-button>
                </template>
            </b-modal>
        </b-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    name: 'AdicionarFilme',
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
                classificacao: '',
            },

            trailerURL: '',
            novaCategoria: '',

            categorias: null,
            message: null,
            erros: null,
        }
    },

    computed: {
        ...mapGetters(['getCategoria', 'isNomeFilmeAvalido', 'isCategoriaAvailable']),

        categoriasOrdenadas() {
            console.log(this.categorias);
            console.log('teste');
            return this.categorias.slice(0).sort(this.ordenarAlfabeticaCategoria);
        },
    },

    methods: {
        ...mapMutations(['SET_FILMES', 'SET_CATEGORIAS', 'SET_FILME']),

        async adicionarFilme() {
            this.message = "";
            this.errors = [];
            let confimarNovoFilme = true

            for (let i in this.form) {
                if (this.form[i].length === 0) {
                    confimarNovoFilme = false;
                    break;
                }
            }
            for (let i of this.form.categorias) {
                if (i.length === 0 || i == 'Outros') {
                    confimarNovoFilme = false;
                    break;
                }
            }

            if (confimarNovoFilme) {
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
                    classificacao: this.form.classificacao,
                    avaliacao: 0,
                    nAvaliacoes: 0,
                    comentarios: [],
                };

                try {
                    let novoFilmeID = await this.$store.dispatch("novoFilme", novoFilme);
                    console.log(novoFilmeID);
                    // this.$router.push({ name: "filme", params: { filmeID: this.form.nome } });
                } catch (error) {
                    this.message =
                        (error.response && error.response.data) ||
                        error.message || error.toString();
                }
            }
            else {
                this.errors.push("Dados em falta ou invalidos, volta a confimar!");
            }
        },

        async getListaCategorias() {
            try {
                await this.$store.dispatch("getAllCategorias");
                this.categorias = this.getCategoria;
                console.log(this.categorias);
                console.log('----');
            }
            catch (error) {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        },

        ordenarAlfabeticaCategoria(categoriaA, categoriaB) {
            if (categoriaA.categoria < categoriaB.categoria) return -1;
            else if (categoriaA.categoria > categoriaB.categoria) return 1;
            else return 0;
        },

        addCategoria() {
            this.form.categorias.push('')
        },

        novaCategoriaModal() {
            if (this.form.categorias.find((categoria) => categoria == 'Outros')) {
                this.$refs['novaCategoriaModal'].show()
            }
        },

        NovaCategoria() {
            if (this.novaCategoria.length != 0) {
                if (this.isCategoriaAvailable(this.novaCategoria)) {
                    alert('ola')
                    this.SET_CATEGORIAS(this.novaCategoria)
                    this.$refs['novaCategoriaModal'].hide()
                }
                else {
                    alert('Esse categoria já existe')
                }
            }
        },

        trailerFilme() {
            this.form.trailer = this.trailerURL.replace('watch?v=', 'embed/');
            this.$refs['ficheirosModalTrailer'].hide()
        },

        // adicionarFilme() {
        //     let confimarNovoFilme = true

        // for (let i in this.form) {
        //     if (this.form[i].length === 0) {
        //         confimarNovoFilme = false;
        //         break;
        //     }
        // }
        // for (let i of this.form.categorias) {
        //     if (i.length === 0 || i == 'Outros') {
        //         confimarNovoFilme = false;
        //         break;
        //     }
        // }

        //     if (confimarNovoFilme) {
        //         if (this.isNomeFilmeAvalido(this.form.nome)) {
        // let realizador = this.form.realizador.split(',');
        // let elenco = this.form.elenco.split(',');
        // let trailer = this.form.trailer.replace('watch?v=', 'embed/');

        // let novoFilme = {
        //     nome: this.form.nome,
        //     imagem: this.form.imagem,
        //     trailer: trailer,
        //     tipo: this.form.tipo,
        //     categoria: this.form.categorias,
        //     ano: this.form.ano,
        //     realizador: realizador,
        //     produtora: this.form.produtora,
        //     elenco: elenco,
        //     sinopse: this.form.sinopse,
        //     classificacao: this.form.classificacao,
        //     avaliacao: 0,
        //     nAvaliacoes: 0,
        //     comentarios: [],
        // };

        //             this.SET_FILMES(novoFilme);
        //             this.$router.push({ name: "filme", params: { filmeNome: this.form.nome } });
        //         }
        //         else {
        //             alert('Já existe um filme com esse nome')
        //         }
        //     }
        //     else {
        //         alert('Informação em falta ou invalida!')
        //     }
        // },
    },

    mounted() {
        this.getListaCategorias();
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

#nomeFilme {
    margin-top: 3%;
    margin-bottom: 2%;
    height: 45px;
    width: 250px;
}

#imgFilme {
    position: relative;
    left: 1.2vw;
    top: 21.75vh;
    z-index: 1;
    width: 140px;
    height: 210px;
}

.imgFilme {
    width: 100%;
    height: 100%;
    background-color: white;
    color: black;
    border: 1px solid black;
}

/* img.imgFilme{
    bottom: 12.15vh;
} */

#trailer {
    position: relative;
    left: 1vw;
    top: -10vw;
    width: 560px;
    height: 315px;
}

.trailer {
    width: 100%;
    height: 100%;
    background-color: white;
    color: black;
}

#trocarTrailer {
    position: absolute;
    right: -2px;
    width: 35px;
    height: 35px;
    padding: 0;
    background-color: #565e6447;
    border: 0px;
}

#trocarTrailer:hover {
    background-color: #565e64a2;
}

#anoFilme,
#realizadorFilme,
#produtoraFilme,
#elencoFilme,
#selCategoriaFilme,
#selTipoFilme,
#selClassificacaoFilme {
    height: 40px;
    width: 255px;
    display: inline;
    font-family: var(--font01);
    font-size: 13pt;
}

#selCategoriaFilme {
    width: 200px !important;
}

.categoriaFilme {
    position: relative;
    padding: 0;
    padding-right: 12px;
}

.categoriaFilme>.menosCategoria {
    position: absolute;
    top: -18px;
    right: 2.5px;
    width: 20px;
    height: 20px;
    color: black;
    padding: 0px;
    font-family: var(--font2);
}

#addCategoriaId {
    position: relative;
    top: -3px;
}

#inputsInfFilme>div {
    margin-bottom: 5px;
}

button {
    margin-left: 1%;
    margin-right: 0.5%;
    margin-bottom: 0.5%;
}

span {
    font-family: var(--font2);
    font-size: 20px;
}

.infoFilme {
    text-decoration: none;
    color: white;
    font-family: var(--font1);
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

#btnAdicionarFilme {
    margin-top: 25px;
    font-family: var(--font2);
    color: black;
    background-color: var(--cor3);
    height: 55px;
    width: 150px;
}
</style>