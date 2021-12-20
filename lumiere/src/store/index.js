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
  ],
  },
  getters: {
    getJogos: (state) => state.jogos,
  },
  mutations: {
    SET_NOVO_JOGO(state, payload) {
      state.jogos.push(payload);
      localStorage.jogos = JSON.stringify(state.jogos);
    }
  },
  actions: {
  },
  modules: {
  }
})
