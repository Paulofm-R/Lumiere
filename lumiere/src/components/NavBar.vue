<template>
    <div id="navBar">
        <b-container fluid>
            <b-row id="nav">
              <b-col cols="4"> 
                <router-link to="/" class="nome">Lumière</router-link>
              </b-col>
              <b-col cols="8" class="links">
                <router-link class="link" :to="{name: 'filmes'}">Catálogo</router-link>
                <router-link class="link" :to="{name: 'jogos'}">Jogos</router-link>
                <router-link class="link" :to="{name: 'sobreNos'}">Sobre Nós </router-link>
                <b-button v-if="getLoggedUser == ''" v-b-modal.loginModal id="entrar">ENTRAR</b-button>
                <router-link v-else class="link" :to="{name: 'perfil'}">
                    <span id="nomeUtilizador">{{getLoggedUser.nome}}</span>
                    <img :src="getLoggedUser.foto" id="imgPerfil">
                </router-link>
                <b-button v-if="getLoggedUser != ''" variant="outline-light" @click="logout()"><b-icon icon="door-open"></b-icon></b-button>
              </b-col>

              <!-- Modais -->
              <!-- Login -->
              <b-modal ref="loginModal" id="loginModal" centered
                      header-bg-variant="info"
                      header-text-variant="light"
                      body-bg-variant="light"
                      footer-bg-variant="light"
                      no-stacking>
                <template #modal-header="{close}">
                    <h4 class="modalTitulo">LOGIN</h4>
                    <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                </template>
                <template>
                  <form @submit.prevent="login">
                    <label for="username">Username: </label>
                    <input type="text" id="username" v-model="nome">
                    <br>
                    <label for="password">Password :  </label>
                    <input type="password" id="password" v-model="palavra_passe">
                    <p id="txtRegisto">Não tens conta?<a style="color: #4BC3B5" v-b-modal.registarModal>Regista-te!</a></p>
                  </form>
                </template>
                <template #modal-footer>
                    <b-button class="modalFooter" id='login' @click='login()'>Login</b-button>
                </template>
              </b-modal>

              <!-- Registar -->
              <b-modal ref="registarModal" id="registarModal" centered
                      header-bg-variant="info"
                      header-text-variant="light"
                      body-bg-variant="light"
                      footer-bg-variant="light">
                  <template #modal-header="{close}">
                      <h4 class="modalTitulo">REGISTAR</h4>
                      <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
                  </template>
                  <template>
                    <form @submit.prevent="regitar">
                      <label for="username">Username: </label>
                      <input type="text" id="username" v-model="nome" required>
                      <br>
                      <label for="password">Password :  </label>
                      <input type="password" id="password" v-model="palavra_passe" required>
                      <br>
                      <label for="cPassword">Confirmar Password:  </label>
                      <input type="password" id="cPassword" v-model="cpalavra_passe" required>
                      <br>
                      <label for="dataNasc">Data Nascimento:  </label>
                      <input type="date" id="dataNasc" v-model="data_nascimento" required>
                    </form> 
                  </template>
                  <template #modal-footer>
                      <b-button class="modalFooter" id='registar' @click='registar()'>Registar</b-button>
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
              nome: '',
              palavra_passe: '',
              cpalavra_passe: '',
              data_nascimento: '',
              tipo: 'utilizador',
              utilizadores: localStorage.getItem('utilizadores') ? JSON.parse(localStorage.getItem('utilizadores')) : [],
          }
        },

        computed: {
          ...mapGetters(['isUser','isUsernameAvailable', 'getLoggedUser']),
        },

        methods: {
          ...mapMutations(['SET_NEW_USER', 'SET_LOGGED_USER', 'SET_LOGOUT']),

          login(){
            if(this.isUser(this.nome, this.palavra_passe)){
              this.SET_LOGGED_USER(this.nome);
              this.$refs['loginModal'].hide()
            }else{    	
              alert('User Not Found')
            }
          },

          registar(){
            if(this.nome != '', this.palavra_passe != '',this.data_nascimento != ''){
              if(this.isUsernameAvailable(this.nome)) {
                let novoUser = {
                  nome: this.nome,
                  palavra_passe: this.palavra_passe,
                  data_nascimento: this.data_nascimento,
                  foto: '../../src/assets/img/User.svg',
                  tipo: 'utilizador',
                }
                if(this.palavra_passe == this.cpalavra_passe){
                  this.SET_NEW_USER(novoUser);
                  this.SET_LOGGED_USER(this.nome);
                  this.loggedUser = novoUser
                  this.$refs['registarModal'].hide()
                }else{
                  alert('ERROR')
                }
                
              }else{
                alert('User Already Exists')
              }
            }    
          },

          logout() {
            this.SET_LOGOUT(this.loggedUser)
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

<style scoped>
#nav{
  padding: 15px;
}

.nome{
  text-decoration: none;
  font-family: var(--font0);
  font-size: 2em;
  color: var(--cor3);
}

.links{
  text-align: right;
  padding-top: 10px;
}

.link{
  padding: 10px;
  text-decoration: none;
  color: white;
  font-family: var(--font1);
}

.link:hover{
  font-family: var(--font2);
}

.link.router-link-exact-active {
  color: #42b983;
  font-family: var(--font2);
  font-size: 1.2em;
}

#entrar{
  background-color: var(--cor3);
  border-radius: 10px;
  width: 75px;
  font-family: var(--font1);
}

#nomeUtilizador{
  padding-right: 10px;
}

#txtRegisto{
  font-family: var(--font1);
  font-size: 12px;
}

#imgPerfil{
  width: 50px;
  height: 50px;
  border-radius: 90%;
}

.modalTitulo{
  margin: auto;
}

.modalFooter{
  margin: auto;
}

.fecharModal{
  position: absolute;
  right: 5px;
  top: 0px;
  color: white;
}
</style>