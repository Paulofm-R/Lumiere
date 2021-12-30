import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Utilizadores
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
    loggedUser: '',
    // Jogos
    jogos: localStorage.jogos ? JSON.parse(localStorage.jogos) : [{
      nome: 'Marvel Quizz',
      img: 'https://i.pinimg.com/564x/24/92/00/249200c431fe811110761709b303fcaf.jpg',
      tipo: "Quizz",
      perguntas: [{
        pergunta: 'Qual destes não é considerado um Avengers?',
        alternativas: ['Loki', 'Hawkeye', 'Ant-Man', 'Spider-Man'],
        resposta: 'Loki',
      },{
        pergunta: 'De qual mitologia pertence o Thor?',
        alternativas: ['Grega', 'Romana', 'Egipcia', 'Nordica'],
        resposta: 'Nordica',
      },{
        pergunta: 'Em que filme o Deadpool fez a sua primeira aparição?',
        alternativas: ['Deadpool', 'Homem de Ferro', 'X-Men Origens: Wolverine', 'X-Men: First Class'],
        resposta: 'X-Men Origens: Wolverine',
      },{
        pergunta: 'Como se chamava o meia/o irmã/ão do Wolverine?',
        alternativas: ['Ororo Munroe', 'Scott Summers', 'Jean Grey', 'Victor Creed'],
        resposta: 'Victor Creed',
      }]
    },{
      nome: 'Quantos herois conheces?',
      img: 'https://poltronanerd.com.br/wp-content/uploads/2020/05/Screenshot_2020-05-13-The-History-Of-The-DC-Comics-Logo.png'
    },{
      nome: 'Marvel Quizz',
      img: 'https://i.pinimg.com/564x/24/92/00/249200c431fe811110761709b303fcaf.jpg',
      tipo: "Quizz",
      perguntas: [{
        pergunta: 'Qual destes não é considerado um Avengers?',
        alternativas: ['Loki', 'Hawkeye', 'Ant-Man', 'Spider-Man'],
        resposta: 'Loki',
      },{
        pergunta: 'De qual mitologia pertence o Thor?',
        alternativas: ['Grega', 'Romana', 'Egipcia', 'Nordica'],
        resposta: 'Nordica',
      },{
        pergunta: 'Em que filme o Deadpool fez a sua primeira aparição?',
        alternativas: ['Deadpool', 'Homem de Ferro', 'X-Men Origens: Wolverine', 'X-Men: First Class'],
        resposta: 'X-Men Origens: Wolverine',
      },{
        pergunta: 'Como se chamava o meia/o irmã/ão do Wolverine?',
        alternativas: ['Ororo Munroe', 'Scott Summers', 'Jean Grey', 'Victor Creed'],
        resposta: 'Victor Creed',
      }]
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
    tipoJogo: localStorage.tipoJogo ? JSON.parse(localStorage.tipoJogo) : ['Quizz', 'Preencher', 'Lista'],
    // Filmes
    filmes: localStorage.filmes ? JSON.parse(localStorage.filmes) : [{ 
      nome: 'Ant-Man and theWasp (2019)',
      imagem: 'https://m.media-amazon.com/images/M/MV5BYjcyYTk0N2YtMzc4ZC00Y2E0LWFkNDgtNjE1MzZmMGE1YjY1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg',
      avaliacao: 3.5,
    },{ 
      nome: 'Avengers - EndGame (2019)',
      imagem: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
      avaliacao: 4.2,
    },{ 
      nome: 'Guardians of the Galaxy (2014)',
      imagem: 'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_.jpg',
      avaliacao: 4.0,
    },],
  },

  getters: {
    // Utilizador
    isUser: (state) => (nome, palavra_passe) => state.utilizadores.some((user) => user.nome === nome && user.palavra_passe === palavra_passe),
    isUsernameAvailable: (state) => (nome) => state.utilizadores.every((user) => user.nome !== nome),
    getLoggedUser: (state) => state.loggedUser,
     // Jogos
    getJogos: (state) => state.jogos,
    isNomeJogoAvalido: (state) => (nome) => state.jogos.every((jogo) => jogo.nome !== nome),
    getTipoJogo: (state) => state.tipoJogo,
    // Filmes
    getFilmes: (state) => state.filmes,
  },
  mutations: {
    // Utilizador
    SET_LOGGED_USER(state, payload){
      state.loggedUser = state.utilizadores.find((user) => user.nome === payload);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    SET_NEW_USER(state, payload){
      state.utilizadores.push(payload);
      state.loggedUser = state.utilizadores.find((user) => user.nome === payload);
      localStorage.utilizadores = JSON.stringify(state.utilizadores);
    },
    SET_LOGOUT(state){
      state.loggedUser = '';
      localStorage.removeItem('loggedUser');
    },
    // Jogos
    SET_NOVO_JOGO(state, payload) {
      state.jogos.push(payload);
      localStorage.jogos = JSON.stringify(state.jogos);
    },
    SET_REMOVER_JOGO(state, payload) {
      state.jogos = state.jogos.filter((jogo) => jogo.nome != payload)
      localStorage.jogos = JSON.stringify(state.jogos);
    },
    // Filmes
    SET_NOVO_FILME(state, payload) {
      state.filmes.push(payload);
      localStorage.filmes = JSON.stringify(state.filmes);
    },
    SET_REMOVER_FILME(state, payload) {
      state.filmes = state.filmes.filter((filme) => filme.nome != payload)
      localStorage.filmes = JSON.stringify(state.filmes);
    },
  },
  actions: {
  },
  modules: {
  }
})
