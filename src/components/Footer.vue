<template>
    <div id="footer">
        <b-container fluid>
            <b-row align-h="center">
                <b-col id="linhaFooter">
                    <hr>
                </b-col>
            </b-row>
            <b-row align-h="between">
                <b-col cols="2" class="links">
                    <router-link to="/" class="nome">Lumière</router-link>
                    <br>
                    <router-link class="link" :to="{name: 'filmes'}">Catálogo</router-link>
                    <br>
                    <router-link class="link" :to="{name: 'jogos'}">Jogos</router-link>
                    <br>
                    <router-link class="link" :to="{name: 'sobreNos'}">Sobre Nós </router-link>
                </b-col>
                <b-col cols="2" id="redes">
                    <b-icon icon="facebook" font-scale="2.55" class='icon'></b-icon>
                    <b-icon icon="instagram" font-scale="2.55" class='icon'></b-icon>
                    <b-icon icon="twitter" font-scale="2.55" class='icon'></b-icon>
                    <br>
                    <span>@2022</span>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "ComponenteFooter",

    }
</script>

<style scoped>
#footer{
    margin-top: 5vh;
    padding-left: 15px;
    padding-right: 15px;
}

#linhaFooter{
    padding-left: 14px;
    padding-right: 14px
}

.links{
    margin-bottom: 2vh;
}

.nome{
  text-decoration: none;
  font-family: var(--font0);
  font-size: 1.5em;
  color: var(--cor3);
}

.link{
    text-decoration: none;
    color: white;
    font-family: var(--font1);
}

.link:hover{
  font-family: var(--font2);
}

#redes{
    text-align: right;
    font-family: var(--font1);
}

.icon{
    padding-left: 13px;
    margin-bottom: 1vh;
}

</style>