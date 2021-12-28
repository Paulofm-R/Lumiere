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
          <b-button v-if='loggedUser == null' v-b-modal.adicionarModal id="entrar">ENTRAR</b-button>
          <router-link v-else class="link" :to="{name: 'perfil'}">
            nome
            <img src="" alt="">
          </router-link>
          
        </b-col>
        <b-modal id="adicionarModal" centered
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light">
                <template #modal-header="">
                    LOGIN
                </template>
                <template>
                  <form submit.prevent = "login">
                    <label for="username">Username: </label>
                    <input type="text" id="username" v-model="username">
                    <br>
                    <label for="password">Password :  </label>
                    <input type="password" id="password" v-model="password">
                    <p id="txtRegisto">Não tens conta?<a style="color: #4BC3B5" v-b-modal.registarModal>Regista-te!</a></p>
                  </form>
                </template>
                <template #modal-footer>
                    <b-button id='login' @click='login()'>Login</b-button>
                </template>
          </b-modal>
          <b-modal id="registarModal" centered
                header-bg-variant="info"
                header-text-variant="light"
                body-bg-variant="light"
                footer-bg-variant="light">
                <template #modal-header="">
                    REGISTAR
                </template>
                <template>
                  <form submit.prevent="regitar">
                    <label for="username">Username: </label>
                    <input type="text" id="username" v-model="username">
                    <br>
                    <label for="password">Password :  </label>
                    <input type="password" id="password" v-model="password">
                    <br>
                    <label for="cPassword">Confirmar Password:  </label>
                    <input type="password" id="cPassword" v-model="cPassword">
                    <br>
                    <label for="dataNasc">Data Nascimento:  </label>
                    <input type="date" id="dataNasc" v-model="dataNasc">
                  </form> 
                </template>
                <template #modal-footer>
                    <b-button id='registar' @click='registar()'>Registar</b-button>
                </template>
          </b-modal>
        <router-view/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    export default {
        name: 'App',
        data() {
            return {
              username: '',
              password: '',
              cPassword: '',
              dataNasc: '',
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

        computed: {
          ...mapGetters(['isUser']),
          ...mapGetters(['isUsernameAvailable']),
        },

        methods: {
          login(){
            if(this.isUser(this.username, this.password)){
              this.SET_LOGGED_USER(this.username);
            }else{
              alert('User Not Found')
            }
          },
          ...mapMutations(['SET_LOGGED_USER']),
          registar(){
            if(this.isUsernameAvailable(this.username)) {
              this.SET_NEW_USER(this.username);
            }else{
              alert('User Already Exists')
            }
          },
          ...mapMutations(['SET_NEW_USER'])
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
  src: url('./assets/font/Spartan/static/Spartan-ExtraBold.ttf') format('truetype');
}

@font-face {
  font-family: 'News Cycle';
  src: url('./assets/font/news cycle/NewsCycle-Regular.ttf') format('truetype')
}

@font-face {
  font-family: 'News Cycle-Bold';
  src: url('./assets/font/news cycle/NewsCycle-Bold.ttf') format('truetype');
}

@font-face {
  font-family: 'Meow_Script';
  src: url('./assets/font/Meow_Script/MeowScript-Regular.ttf') format('truetype');
}

:root {
  --cor0: #010402;
  --cor1: #1C2C54;
  --cor2: #FADA5E;
  --cor3: #4BC3B5;
  --cor4: #CDF0E5;
  --font0: 'Spartan';
  --font1: 'News Cycle';
  --font2: 'News Cycle-Bold';
  --font3: 'Meow_Script';
}

* {
  margin: 0px;
  padding: 0px;
}

#app {
  min-height: 100vh;
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
  font-family: var(--font1);
}

#txtRegisto{
  font-family: var(--font1);
  font-size: 12px;
}
</style>
