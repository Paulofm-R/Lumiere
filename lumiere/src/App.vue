<template>
  <div id="app">
    <b-container fluid>
      <b-row id="nav">
        <b-col cols="4"> 
          <router-link to="/" id="nome">Lumière</router-link>
        </b-col>
        <b-col cols="8" id="links">
          <router-link class="link" :to="{name: 'filmes'}">Catálogo</router-link>
          <router-link class="link" :to="{name: 'jogos'}">Jogos</router-link>
          <router-link class="link" :to="{name: 'sobreNos'}">Sobre Nós </router-link>
          <button id="entrar">ENTRAR</button>
        </b-col>
        <router-view/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                utilizadores: localStorage.getItem('utilizadores') ? JSON.parse(localStorage.getItem('utilizadores')) : [],
                
            }
        },
        created () {
          if (this.utilizadores.length == 0) {
            this.utilizadores = [
              {
                nome: "Paulo Rodrigues",
                palavra_passe: 'nao sei',
                data_nascimento: '2000-09-16',
                foto: '',
                tipo: 'admin',
              },
              {
                nome: "Sofia Freitas",
                palavra_passe: 'nao sei',
                data_nascimento: '2001-11-07',
                foto: '',
                tipo: 'admin',
              },
              ];
          }
        },

        watch: {
          utilizadores: {
            deep: true,
            handler() {
              localStorage.setItem('utilizadores', JSON.stringify(this.utilizadores));
            }
          }
        },
    }
</script>

<style>
@font-face {
  font-family: 'Spartan';
  src: url('./assets/font/Spartan/static/Spartan-ExtraBold.ttf');
}

@font-face {
  font-family: 'News Cycle';
  src: url('./assets/font/news cycle/NewsCycle-Regular.ttf');
}

@font-face {
  font-family: 'Meow_Script';
  src: url('./assets/font/Meow_Script/MeowScript-Regular.ttf');
}

:root {
  --cor0: #010402;
  --cor1: #1C2C54;
  --cor2: #FADA5E;
  --cor3: #4BC3B5;
  --cor4: #CDF0E5;
  --font0: 'Spartan';
  --font1: 'News Cycle';
  --font2: 'Meow_Script';
}

* {
  margin: 0px;
  padding: 0px;
}

#app {
  height: 100vh;
  background-color: #010402;
  color: white;
}

#nav{
  padding: 15px;
}

#nome{
  text-decoration: none;
  font-family: var(--font0);
  font-size: 2em;
  color: var(--cor3);
}

#links{
  text-align: right;
  padding-top: 10px;
}

.link{
  padding: 10px;
  text-decoration: none;
  color: white;
  font-family: var(--font1);
}

#entrar{
  background-color: var(--cor3);
  border-radius: 10px;
  width: 75px;
}
</style>
