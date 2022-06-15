<template>
  <div id="navBar">
    <b-container fluid>
      <b-row id="nav">
        <b-col cols="4">
          <router-link to="/" class="nome">Lumière</router-link>
        </b-col>
        <b-col cols="8" class="links">
          <router-link class="link" :to="{ name: 'filmes' }">Catálogo</router-link>
          <router-link class="link" :to="{ name: 'jogos' }">Jogos</router-link>
          <router-link class="link" :to="{ name: 'sobreNos' }">Sobre Nós </router-link>
          <b-button v-if="getLoggedUser === null" v-b-modal.loginModal id="entrar">ENTRAR</b-button>
          <router-link v-else class="link" :to="{ name: 'perfil' }">
            <span id="nomeUtilizador">{{ getLoggedUser.nome }}</span>
            <img :src="getLoggedUser.foto" id="imgPerfil">
          </router-link>
          <b-button v-if="getLoggedUser !== null" variant="outline-light" @click="logout()">
            <b-icon icon="door-open"></b-icon>
          </b-button>
        </b-col>

        <!-- Modais -->
        <!-- Login -->
        <b-modal ref="loginModal" id="loginModal" centered header-bg-variant="info" header-text-variant="light"
          body-bg-variant="light" footer-bg-variant="light" no-stacking>
          <template #modal-header="{ close }">
            <h4 class="modalTitulo">LOGIN</h4>
            <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
          </template>
          <template>
            <div class="bodyModal">
              <form @submit.prevent="login">
                <div class='inputLogin'>
                  <label for="username">Username: </label>
                  <input type="text" id="username" v-model="utilizador.nome">
                </div>
                <div class='inputLogin'>
                  <label for="password">Password : </label>
                  <input type="password" id="password" v-model="utilizador.palavra_passe">
                </div>
                <p id="txtRegisto">Não tens conta?<a style="color: #4BC3B5" v-b-modal.registarModal>Regista-te!</a></p>
              </form>
            </div>
          </template>
          <template #modal-footer>
            <b-button class="modalFooter" id='login' @click='handleLogin()'>Login</b-button>
          </template>
        </b-modal>

        <!-- Registar -->
        <b-modal ref="registarModal" id="registarModal" centered header-bg-variant="info" header-text-variant="light"
          body-bg-variant="light" footer-bg-variant="light">
          <template #modal-header="{ close }">
            <h4 class="modalTitulo">REGISTAR</h4>
            <b-button @click="close" variant="info" class='fecharModal'>x</b-button>
          </template>
          <template>
            <form @submit.prevent="regitar">
              <b-row>
                <b-col id="labelRegistro" cols="6">
                  <label class='labelRegistro' for="username">Username: </label>
                  <br>
                  <label class='labelRegistro' for="password">Password : </label>
                  <br>
                  <label class='labelRegistro' for="cPassword">Confirmar Password: </label>
                  <br>
                  <label class='labelRegistro' for="dataNasc">Data Nascimento: </label>
                </b-col>
                <b-col id="inputRegistro" cols="6">
                  <input class='inputRegistro' type="text" id="username" v-model="novoUtilizador.nome" required>
                  <br>
                  <input class='inputRegistro' type="password" id="password" v-model="novoUtilizador.palavra_passe"
                    required>
                  <br>
                  <input class='inputRegistro' type="password" id="cPassword" v-model="cpalavra_passe" required>
                  <br>
                  <input class='inputRegistro' type="date" id="dataNasc" v-model="novoUtilizador.data_nascimento"
                    required>
                </b-col>
              </b-row>
            </form>
          </template>
          <template #modal-footer>
            <b-button class="modalFooter" id='registar' @click='handleRegister()'>Registar</b-button>
          </template>
        </b-modal>
        <router-view />
      </b-row>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

class Login {
  constructor(nome, palavra_passe) {
    this.nome = nome;
    this.palavra_passe = palavra_passe;
  }
}

class Registro {
  constructor(nome, palavra_passe, data_nascimento) {
    this.nome = nome;
    this.palavra_passe = palavra_passe;
    this.data_nascimento = data_nascimento;
  }
}

export default {
  name: 'NavBar',
  data() {
    return {
      cpalavra_passe: '',
      utilizadores: localStorage.getItem('utilizadores') ? JSON.parse(localStorage.getItem('utilizadores')) : [],

      utilizador: new Login("", "", ""),
      novoUtilizador: new Registro(null, null, null, null),
      message: "",
      successful: false,
      errors: [],
    }
  },

  computed: {
    ...mapGetters(["getMessage", 'isUser', 'isUsernameAvailable', 'getLoggedUser']),
  },

  methods: {
    ...mapMutations(['SET_LOGGED_USER', 'SET_LOGOUT']),

    async handleLogin() {
      this.errors = [];
      if (this.utilizador.nome && this.utilizador.palavra_passe) {
        try {
          await this.$stote.dispatch("login", this.utilizador);
          this.$refs['loginModal'].hide()
        }
        catch (error) {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      }
      else {
        if (!this.utilizador.nome) {
          this.errors.push("É preciso um nome de utilizador");
        }
        if (!this.utilizador.palavra_passe) {
          this.errors.push("É preciso de uma palavra-passe");
        }
      }
    },

    async handleRegister() {
      this.message = "";
      this.successful = false;
      this.errors = [];

      if (this.novoUtilizador.nome && this.novoUtilizador.palavra_passe && this.novoUtilizador.data_nascimento) {
        if (this.novoUtilizador.palavra_passe == this.cpalavra_passe) {
          //makes request by dispatching an action
          try {
            await this.$store.dispatch("register", this.novoUtilizador /*formData*/);
            this.message = this.getMessage;
            this.successful = true;
          } catch (error) {
            this.message =
              (error.response && error.response.data) ||
              error.message || error.toString();
          }
        }
        else {
          this.errors.push("A palavra passe não foi confirmada corretamente")
        }
      } 
      else {
        if (!this.novoUtilizador.nome) {
          this.errors.push("É preciso um nome de utilizador");
        }
        if (!this.novoUtilizador.palavra_passe) {
          this.errors.push("É preciso de uma palavra-passe");
        }
        if (!this.novoUtilizador.data_nascimento) {
          this.errors.push("É preciso de uma data de nascimento");
        }
      }
    },

    // login() {
    //   if (this.isUser(this.nome, this.palavra_passe)) {
    //     this.SET_LOGGED_USER(this.nome);
    //     this.$refs['loginModal'].hide()
    //   } else {
    //     alert('User Not Found')
    //   }
    // },

    registar() {
      if (this.nome != '', this.palavra_passe != '', this.data_nascimento != '') {
        if (this.isUsernameAvailable(this.nome)) {
          let novoUser = {
            nome: this.nome,
            palavra_passe: this.palavra_passe,
            data_nascimento: this.data_nascimento,
            foto: './image/User.svg',
            tipo: 'utilizador',
          }
          if (this.palavra_passe == this.cpalavra_passe) {
            this.SET_NEW_USER(novoUser);
            this.SET_LOGGED_USER(this.nome);
            this.loggedUser = novoUser
            this.$refs['registarModal'].hide()
          } else {
            alert('ERROR')
          }

        } else {
          alert('User Already Exists')
        }
      }
    },

    logout() {
      this.SET_LOGOUT(this.loggedUser)
      this.$router.push({ name: "paginaInicial" })
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
#nav {
  padding: 15px;
}

.nome {
  text-decoration: none;
  font-family: var(--font0);
  font-size: 2em;
  color: var(--cor3);
}

.links {
  text-align: right;
  padding-top: 10px;
}

.link {
  padding: 10px;
  text-decoration: none;
  color: white;
  font-family: var(--font1);
}

.link:hover {
  font-family: var(--font2);
}

.link.router-link-exact-active {
  color: white;
  font-family: var(--font2);
  font-size: 1.2em;
}

#entrar {
  background-color: var(--cor3);
  border-radius: 10px;
  width: 75px;
  font-family: var(--font1);
}

#nomeUtilizador {
  padding-right: 10px;
}

#txtRegisto {
  font-family: var(--font1);
  font-size: 12px;
}

#imgPerfil {
  width: 50px;
  height: 50px;
  border-radius: 90%;
}

.modalTitulo {
  margin: auto;
}

.modalFooter {
  margin: auto;
}

.fecharModal {
  position: absolute;
  right: 5px;
  top: 0px;
  color: white;
}

.bodyModal {
  text-align: center;
}

.inputLogin {
  margin: 10px;
}

#labelRegistro {
  text-align: right;
  padding-right: 5px;
}

#inputRegistro {
  text-align: left;
  padding-left: 5px;
}

.labelRegistro {
  margin-bottom: 10px;
}

.inputRegistro {
  margin-bottom: 5px;
}
</style>