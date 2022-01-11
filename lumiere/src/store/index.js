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
        foto: '../assets/img/User.svg',
        tipo: 'admin',
      },
      {
        nome: "Sofia Freitas",
        palavra_passe: 'nao sei',
        data_nascimento: '2001-11-07',
        foto: '../../src/assets/img/User.svg',
        tipo: 'admin',
      },
    ],
    loggedUser: localStorage.loggedUser ? JSON.parse(localStorage.loggedUser) : '',

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
      }],
      classificacao: [{
        utilizador: 'Joaquim Almeida',
        pontuacao: 75,
      },{
        utilizador: 'Paulo Rodrigues',
        pontuacao: 95
      },{
        utilizador: 'Carlos Fernandes',
        pontuacao: 90
      },{
        utilizador: 'Sofia Freitas',
        pontuacao: 90
      },{
        utilizador: 'Sofia Santos',
        pontuacao: 95
      },{
        utilizador: 'Mario Peneda',
        pontuacao: 100
      },]
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
      nome: 'Ant-Man and the Wasp (2019)',
      imagem: 'https://m.media-amazon.com/images/M/MV5BYjcyYTk0N2YtMzc4ZC00Y2E0LWFkNDgtNjE1MzZmMGE1YjY1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg',
      trailer: 'https://www.youtube.com/embed/UUkn-enk2RU',
      avaliacao: 3.5,
      tipo: 'Filme',
      categoria: ['Ação', 'Aventura', 'Comédia'],
      nAvaliacoes: 6,
    },{ 
      nome: 'Avengers - EndGame (2019)',
      imagem: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
      trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c',
      avaliacao: 4.2,
      tipo: 'Filme',
      categoria: ['Ação', 'Aventura', 'Drama'],
      nAvaliacoes: 6,
    },{ 
      nome: 'Guardians of the Galaxy (2014)',
      imagem: 'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_.jpg',
      trailer: 'https://www.youtube.com/embed/d96cjJhvlMA',
      avaliacao: 4.0,
      tipo: 'Filme',
      categoria: ['Ação', 'Aventura', 'Comédia'],
      nAvaliacoes: 6,
    },
    { 
      nome: 'How I met your Mother',
      imagem: 'https://br.web.img3.acsta.net/pictures/18/01/19/01/04/5560874.jpg',
      trailer: 'https://www.youtube.com/embed/aJtVL2_fA5w',
      avaliacao: 4.2,
      tipo: 'Serie',
      categoria: ['Comédia', 'Romance'],
      nAvaliacoes: 6,
    },{ 
      nome: 'Friends',
      imagem: 'https://br.web.img3.acsta.net/r_1280_720/pictures/21/05/14/08/25/4008276.jpg',
      trailer: 'https://www.youtube.com/embed/nnn02NDIEiE',
      avaliacao: 4.4,
      tipo: 'Serie',
      categoria: ['Comédia', 'Romance'],
      nAvaliacoes: 6,
    },{ 
      nome: 'Modern Family',
      imagem: 'https://i.pinimg.com/originals/f0/f3/41/f0f34178d91a5b283e1ec39e982dc4b7.jpg',
      trailer: 'https://www.youtube.com/embed/X0lRjbrH-L8',
      avaliacao: 4.2,
      tipo: 'Serie',
      categoria: ['Comédia', 'Drama', 'Romance'],
      nAvaliacoes: 6,
    },{ 
      nome: 'Mamma Mia',
      imagem: 'https://m.media-amazon.com/images/M/MV5BMTA2MDU0MjM0MzReQTJeQWpwZ15BbWU3MDYwNzgwNzE@._V1_FMjpg_UX1000_.jpg',
      trailer: 'https://www.youtube.com/embed/lkN-A00WLYE',
      avaliacao: 3.8,
      tipo: 'Filme',
      categoria: ['Comédia', 'Musical', 'Romance'],
      nAvaliacoes: 6,
    },],

    categoria: ['Ação', 'Comédia', 'Drama', 'Musical', 'Aventura', 'Romance']
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
    getCategoria: (state) => state.categoria,
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
