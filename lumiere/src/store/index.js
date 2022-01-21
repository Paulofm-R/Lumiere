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
        foto: '@/assets/img/User.svg',
        tipo: 'admin',
        favoritos: [],
        lista: [],
      },
      {
        nome: "Sofia Freitas",
        palavra_passe: 'nao sei',
        data_nascimento: '2001-11-07',
        foto: '@/assets/img/User.svg',    
        tipo: 'admin',
        favoritos: [],
        lista: [],
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
      tipo: 'Filme',
      categoria: ['Ação', 'Aventura', 'Comédia'],
      ano: 2019,
      realizador: ['Peyton Reed'],
      produtora: 'Marvel Studios',
      elenco: ['Paul Rudd', 'Evangeline Lilly', 'Michael Peña'],
      sinopse: 'Enquanto Scott Lang equilibra ser um super-herói e um pai, Hope van Dyne e Dr. Hank Pym apresentam uma nova missão urgente que encontra o Homem-Formiga lutando ao lado da Vespa para descobrir segredos de seu passado.',
      avaliacao: 3.5,
      nAvaliacoes: 6,
      comentarios: [],
    },{ 
      nome: 'Avengers - EndGame (2019)',
      imagem: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
      trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c',
      tipo: 'Filme',
      categoria: ['Ação', 'Aventura', 'Drama'],
      ano: 2019,
      realizador: ['Anthony Russo', 'Joe Russo'],
      produtora: 'Marvel Studios',
      elenco: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
      sinopse: 'Após os eventos devastadores de Vingadores: Guerra Infinita (2018), o universo está em ruínas. Com a ajuda dos aliados restantes, os Vingadores se reúnem mais uma vez para reverter as ações de Thanos e restaurar o equilíbrio do universo.',
      avaliacao: 4.2,
      nAvaliacoes: 6,
      comentarios: [],
    },{ 
      nome: 'Guardians of the Galaxy (2014)',
      imagem: 'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_.jpg',
      trailer: 'https://www.youtube.com/embed/d96cjJhvlMA',
      tipo: 'Filme',
      categoria: ['Ação', 'Aventura', 'Comédia'],
      ano: 2014,
      realizador: ['James Gunn'],
      produtora: 'Marvel Studios',
      elenco: ['Chris Pratt', 'Vin Diesel', 'Bradley Cooper'],
      sinopse: 'Um grupo de criminosos intergalácticos deve se unir para parar um guerreiro fanático com planos de purgar o universo.',
      avaliacao: 4.0,
      nAvaliacoes: 6,
      comentarios: [],
    },
    { 
      nome: 'How I met your Mother',
      imagem: 'https://br.web.img3.acsta.net/pictures/18/01/19/01/04/5560874.jpg',
      trailer: 'https://www.youtube.com/embed/aJtVL2_fA5w',
      tipo: 'Serie',
      categoria: ['Comédia', 'Romance'],
      ano: 2005,
      realizador: ['Carter Bays', 'Craig Thomas'],
      produtora: 'Bays/Thomas Productions',
      elenco: ['Josh Radnor', 'Jason Segel', 'Cobie Smulders'],
      sinopse: 'Um pai conta a seus filhos - através de uma série de flashbacks - a jornada que ele e seus quatro melhores amigos fizeram até ele conhecer sua mãe.',
      avaliacao: 4.2,
      nAvaliacoes: 6,
      comentarios: [],
    },{ 
      nome: 'Friends',
      imagem: 'https://br.web.img3.acsta.net/r_1280_720/pictures/21/05/14/08/25/4008276.jpg',
      trailer: 'https://www.youtube.com/embed/nnn02NDIEiE',
      tipo: 'Serie',
      categoria: ['Comédia', 'Romance'],
      ano: 1994,
      realizador: '',
      produtora: '',
      elenco: ['Jennifer Ani', 'Courteney Cox', 'Lisa Kudrow'],
      sinopse: '',
      avaliacao: 4.4,
      nAvaliacoes: 6,
      comentarios: [],
    },{ 
      nome: 'Modern Family',
      imagem: 'https://i.pinimg.com/originals/f0/f3/41/f0f34178d91a5b283e1ec39e982dc4b7.jpg',
      trailer: 'https://www.youtube.com/embed/X0lRjbrH-L8',
      tipo: 'Serie',
      categoria: ['Comédia', 'Drama', 'Romance'],
      ano: 2009,
      realizador: '',
      produtora: '',
      elenco: ["Ed O'Neill", "Sofía Vergara", "Julie Bowen"],
      sinopse: '',
      avaliacao: 4.2,
      nAvaliacoes: 6,
      comentarios: [],
    },{ 
      nome: 'Mamma Mia',
      imagem: 'https://m.media-amazon.com/images/M/MV5BMTA2MDU0MjM0MzReQTJeQWpwZ15BbWU3MDYwNzgwNzE@._V1_FMjpg_UX1000_.jpg',
      trailer: 'https://www.youtube.com/embed/lkN-A00WLYE',
      tipo: 'Filme',
      categoria: ['Comédia', 'Musical', 'Romance'],
      ano: 2008,
      realizador: '',
      produtora: '',
      elenco: ['Meryl Streep', 'Pierce Brosnan', 'Amanda Seyfried'],
      sinopse: '',
      avaliacao: 3.8,
      nAvaliacoes: 6,
      comentarios: [],
    },],

    categoria: ['Ação', 'Comédia', 'Drama', 'Musical', 'Aventura', 'Romance'],

    desafios:[{nome: 'Joga 5 quizzes',
               nEtapas: '5'}]
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
    isNomeFilmeAvalido: (state) => (nome) => state.filmes.every((filme) => filme.nome !== nome),
    getCategoria: (state) => state.categoria,
    isCategoriaAvailable: (state) => (cat) => state.categoria.every((categoria) => categoria !== cat),

    //Desafios
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
    SET_NEW_PASSWORD(state, payload){
      state.loggedUser = state.utilizadores.find((user) => user.palavra_passe === payload);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
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
    SET_NOVA_CLASSIFICACAO(state, payload) {
      state.jogos.map((jogo) => {
        if (jogo.nome == payload[0])
        jogo.classificacao.push(payload[1]);
      })
      localStorage.jogos = JSON.stringify(state.jogos);
    },
    
    // Filmes
    SET_NOVO_FILME(state, payload) {
      state.filmes.push(payload);
      localStorage.filmes = JSON.stringify(state.filmes);
    },
    SET_REMOVER_FILME(state, payload) {
      state.filmes = state.filmes.filter((filme) => filme.nome != payload);
      localStorage.filmes = JSON.stringify(state.filmes);
    },
    SET_NOVA_CATEGORIA(state, payload) {
      state.categoria.push(payload);
      localStorage.categoria = JSON.stringify(state.categoria);
    }
  },
  actions: {
  },
  modules: {
  }
})
