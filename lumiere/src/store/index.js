import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jogos: localStorage.jogos ? JSON.parse(localStorage.jogos) : [{
      nome: 'Marvel Quizz',
      img: 'https://i.pinimg.com/564x/24/92/00/249200c431fe811110761709b303fcaf.jpg'
    },{
      nome: 'Quantos herois conheces?',
      img: 'https://poltronanerd.com.br/wp-content/uploads/2020/05/Screenshot_2020-05-13-The-History-Of-The-DC-Comics-Logo.png'
    },{
      nome: 'Marvel Quizz',
      img: 'https://i.pinimg.com/564x/24/92/00/249200c431fe811110761709b303fcaf.jpg'
    },{
      nome: 'Quantos herois conheces?',
      img: 'https://poltronanerd.com.br/wp-content/uploads/2020/05/Screenshot_2020-05-13-The-History-Of-The-DC-Comics-Logo.png'
    },{
      nome: 'Quantos herois conheces?',
      img: 'https://poltronanerd.com.br/wp-content/uploads/2020/05/Screenshot_2020-05-13-The-History-Of-The-DC-Comics-Logo.png'
    },{
      nome: 'Marvel Quizz',
      img: 'https://i.pinimg.com/564x/24/92/00/249200c431fe811110761709b303fcaf.jpg'
    },{
      nome: 'Quantos herois conheces?',
      img: 'https://poltronanerd.com.br/wp-content/uploads/2020/05/Screenshot_2020-05-13-The-History-Of-The-DC-Comics-Logo.png'
    },
    {
      nome: 'Marvel Quizz',
      img: 'https://i.pinimg.com/564x/24/92/00/249200c431fe811110761709b303fcaf.jpg'
    },{
      nome: 'Quantos herois conheces?',
      img: 'https://poltronanerd.com.br/wp-content/uploads/2020/05/Screenshot_2020-05-13-The-History-Of-The-DC-Comics-Logo.png'
    }
  ],
    utilizadores: localStorage.utilizadores? JSON.parse(localStorage.utilizadores) : [
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
      ],
      loggedUser: null,
    tipoJogo: localStorage.tipoJogo ? JSON.parse(localStorage.tipoJogo) : ['Quizz', 'Preencher', 'Lista']
  },

  getters: {
    getJogos: (state) => state.jogos,
    isUser: (state) => (username, password) => state.utilizadores.some((user) => user.username === username && user.password === password),
    isUsernameAvailable: (state) => (username) => state.utilizadores.every((user) => user.username !== username),
    getLoggedUser: (state) => state.loggedUser,
    getTipoJogo: (state) => state.tipoJogo,
  },
  mutations: {
    SET_NOVO_JOGO(state, payload) {
      state.jogos.push(payload);
      localStorage.jogos = JSON.stringify(state.jogos);
    },
    SET_LOGGED_USER(state, payload){
      state.loggedUser = state.utilizadores.find((user) => user.username === payload);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    SET_NEW_USER(state, payload){
      state.utilizadores.push(payload);
      // localStotage.utilizadores = JSON.stringify(state.utilizadores);
    },
    SET_LOGOUT(state){
      state.loggedUser = null;
      localStorage.removeItem('loggedUser');
    }
  },
  actions: {
  },
  modules: {
  }
})
