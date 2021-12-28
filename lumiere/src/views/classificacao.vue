<template>
    <div>
        <h2>{{certas}} respostas certas no jogo {{jogo.nome}}</h2>
    </div>
</template>

<script>
    export default {
        name: "classificacao",
        data() {
            return {
                jogo: {},
                certas: 0,
            }
        },

        created () {
            this.jogo = JSON.parse(localStorage.getItem('jogos')).find((jogo) => jogo.nome == this.$route.params.jogoNome);
            this.certas = this.$route.params.certas;
        },
    }
</script>

<style lang="scss" scoped>

</style>