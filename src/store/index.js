import Vue from 'vue'
import Vuex from 'vuex'

import { UtilizadorService } from '@/services/utilizador.service';
import { AutenticadoService } from '@/services/autenticado.service';
import { FilmeService } from '@/services/filme.service';
import { JogoService } from '@/services/jogos.service';
import { CategoriaService } from '@/services/categorias.service';
import { DesafioService } from '@/services/desafios.service';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: "",

    // Utilizadores
    utilizadores: [],
    utilizador: null,
    loggedIn: false,
    loggedUser: null,

    // Jogos
    jogos: [],
    jogo: null,
    tipoJogo: ['Quizz', 'Preencher', 'Lista'],

    // Filmes
    filmes: [],
    filme: null,

    // { 
    //   nome: 'Ant-Man and the Wasp (2019)',
    //   imagem: 'https://m.media-amazon.com/images/M/MV5BYjcyYTk0N2YtMzc4ZC00Y2E0LWFkNDgtNjE1MzZmMGE1YjY1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg',
    //   trailer: 'https://www.youtube.com/embed/UUkn-enk2RU',
    //   tipo: 'Filme',
    //   categoria: ['Ação', 'Aventura', 'Comédia'],
    //   ano: 2019,
    //   realizador: ['Peyton Reed'],
    //   produtora: 'Marvel Studios',
    //   elenco: ['Paul Rudd', 'Evangeline Lilly', 'Michael Peña'],
    //   sinopse: 'Enquanto Scott Lang equilibra ser um super-herói e um pai, Hope van Dyne e Dr. Hank Pym apresentam uma nova missão urgente que encontra o Homem-Formiga lutando ao lado da Vespa para descobrir segredos de seu passado.',
    //   classificacao: 'M/12',
    //   avaliacao: 3.5,
    //   nAvaliacoes: 6,
    //   comentarios: [],
    // }

    // Categorias
    categorias: [],
    // categoria: localStorage.categoria ? JSON.parse(localStorage.categoria) : ['Ação', 'Comédia', 'Drama', 'Musical', 'Aventura', 'Romance'],

    // Desafios
    desafios: [],

    // Jogos
    //   jogos: localStorage.jogos ? JSON.parse(localStorage.jogos) : [{
    //     nome: 'Marvel Quizz',
    //     img: 'https://i.pinimg.com/564x/24/92/00/249200c431fe811110761709b303fcaf.jpg',
    //     tipo: "Quizz",
    //     perguntas: [{
    //       pergunta: 'Qual destes não é considerado um Avengers?',
    //       alternativas: ['Loki', 'Hawkeye', 'Ant-Man', 'Spider-Man'],
    //       resposta: 'Loki',
    //     },{
    //       pergunta: 'De qual mitologia pertence o Thor?',
    //       alternativas: ['Grega', 'Romana', 'Egipcia', 'Nordica'],
    //       resposta: 'Nordica',
    //     },{
    //       pergunta: 'Em que filme o Deadpool fez a sua primeira aparição?',
    //       alternativas: ['Deadpool', 'Homem de Ferro', 'X-Men Origens: Wolverine', 'X-Men: First Class'],
    //       resposta: 'X-Men Origens: Wolverine',
    //     },{
    //       pergunta: 'Como se chamava o meia/o irmã/ão do Wolverine?',
    //       alternativas: ['Ororo Munroe', 'Scott Summers', 'Jean Grey', 'Victor Creed'],
    //       resposta: 'Victor Creed',
    //     }],
    //     classificacao: [{
    //       utilizador: 'Joaquim Almeida',
    //       pontuacao: 75,
    //     },{
    //       utilizador: 'Paulo Rodrigues',
    //       pontuacao: 95
    //     },{
    //       utilizador: 'Carlos Fernandes',
    //       pontuacao: 90
    //     },{
    //       utilizador: 'Sofia Freitas',
    //       pontuacao: 90
    //     },{
    //       utilizador: 'Sofia Santos',
    //       pontuacao: 95
    //     },{
    //       utilizador: 'Mario Peneda',
    //       pontuacao: 100
    //     },]
    //   },{
    //     nome: 'Quantos herois conheces?',
    //     img: 'https://poltronanerd.com.br/wp-content/uploads/2020/05/Screenshot_2020-05-13-The-History-Of-The-DC-Comics-Logo.png',
    //     tipo: 'Preencher',
    //     perguntas: [{
    //       pergunta: 'Nome deste heroi',
    //       anexo: 'https://t.ctcdn.com.br/KZnZL0u8N4F5W6VISUNHlKjP3Nc=/1400x788/smart/i519239.png',
    //       tipoAnexo: 'Imagem',
    //       resposta: 'Flash',
    //     },
    //     {
    //       pergunta: 'Nome deste heroi',
    //       anexo: 'https://files.tecnoblog.net/wp-content/uploads/2021/04/Qual-a-ordem-cronologica-dos-filmes-do-Batman-Deny-Freeman-Flickr.jpg',
    //       tipoAnexo: 'Imagem',
    //       resposta: 'Batman',
    //     },
    //     {
    //       pergunta: 'Nome deste heroi',
    //       anexo: 'https://www.planocritico.com/wp-content/uploads/2017/06/plano-critico-mulher_maravilha_entenda_melhor_plano_critico.jpg',
    //       tipoAnexo: 'Imagem',
    //       resposta: 'Mulher Maravilha',
    //     },],
    //     classificacao: [],
    //     },{
    //       nome: 'Elenco de Mamma Mia',
    //       img: 'https://m.media-amazon.com/images/M/MV5BMTA2MDU0MjM0MzReQTJeQWpwZ15BbWU3MDYwNzgwNzE@._V1_FMjpg_UX1000_.jpg',
    //       tipo: "Lista",
    //       perguntas: [{
    //         pergunta: 'Tenta acertar todos os atores que participaram neste filme!',
    //         anexo: 'https://m.media-amazon.com/images/M/MV5BMTA2MDU0MjM0MzReQTJeQWpwZ15BbWU3MDYwNzgwNzE@._V1_FMjpg_UX1000_.jpg',
    //         tipoAnexo: 'Imagem',
    //         resposta: ['Meryl Streep', 'Amanda Seyfried', 'Stellan Skarsgård', 'Pierce Brosnan', 'Colin Firth', 'Rachel McDowall', 'Ashley Lille', 'Julie Walters', 'Christine Baranski', 'Dominic Cooper'],
    //       }
    //   ],
    //   classificacao: [],
    //   },
    // ], 

    // Filmes
    // filmes: localStorage.filmes ? JSON.parse(localStorage.filmes) : [{ 
    //   nome: 'Ant-Man and the Wasp (2019)',
    //   imagem: 'https://m.media-amazon.com/images/M/MV5BYjcyYTk0N2YtMzc4ZC00Y2E0LWFkNDgtNjE1MzZmMGE1YjY1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg',
    //   trailer: 'https://www.youtube.com/embed/UUkn-enk2RU',
    //   tipo: 'Filme',
    //   categoria: ['Ação', 'Aventura', 'Comédia'],
    //   ano: 2019,
    //   realizador: ['Peyton Reed'],
    //   produtora: 'Marvel Studios',
    //   elenco: ['Paul Rudd', 'Evangeline Lilly', 'Michael Peña'],
    //   sinopse: 'Enquanto Scott Lang equilibra ser um super-herói e um pai, Hope van Dyne e Dr. Hank Pym apresentam uma nova missão urgente que encontra o Homem-Formiga lutando ao lado da Vespa para descobrir segredos de seu passado.',
    //   classificacao: 'M/12',
    //   avaliacao: 3.5,
    //   nAvaliacoes: 6,
    //   comentarios: [],
    // },{ 
    //   nome: 'Avengers - EndGame (2019)',
    //   imagem: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
    //   trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c',
    //   tipo: 'Filme',
    //   categoria: ['Ação', 'Aventura', 'Drama'],
    //   ano: 2019,
    //   realizador: ['Anthony Russo', 'Joe Russo'],
    //   produtora: 'Marvel Studios',
    //   elenco: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
    //   sinopse: 'Após os eventos devastadores de Vingadores: Guerra Infinita (2018), o universo está em ruínas. Com a ajuda dos aliados restantes, os Vingadores se reúnem mais uma vez para reverter as ações de Thanos e restaurar o equilíbrio do universo.',
    //   classificacao: 'M/12',
    //   avaliacao: 4.2,
    //   nAvaliacoes: 6,
    //   comentarios: [],
    // },{ 
    //   nome: 'Guardians of the Galaxy (2014)',
    //   imagem: 'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_.jpg',
    //   trailer: 'https://www.youtube.com/embed/d96cjJhvlMA',
    //   tipo: 'Filme',
    //   categoria: ['Ação', 'Aventura', 'Comédia'],
    //   ano: 2014,
    //   realizador: ['James Gunn'],
    //   produtora: 'Marvel Studios',
    //   elenco: ['Chris Pratt', 'Vin Diesel', 'Bradley Cooper'],
    //   sinopse: 'Um grupo de criminosos intergalácticos deve se unir para parar um guerreiro fanático com planos de purgar o universo.',
    //   classificacao: 'M/12',
    //   avaliacao: 4.0,
    //   nAvaliacoes: 6,
    //   comentarios: [],
    // },
    // { 
    //   nome: 'How I met your Mother',
    //   imagem: 'https://br.web.img3.acsta.net/pictures/18/01/19/01/04/5560874.jpg',
    //   trailer: 'https://www.youtube.com/embed/aJtVL2_fA5w',
    //   tipo: 'Serie',
    //   categoria: ['Comédia', 'Romance'],
    //   ano: 2005,
    //   realizador: ['Carter Bays', 'Craig Thomas'],
    //   produtora: 'Bays/Thomas Productions',
    //   elenco: ['Josh Radnor', 'Jason Segel', 'Cobie Smulders'],
    //   sinopse: 'Um pai conta a seus filhos - através de uma série de flashbacks - a jornada que ele e seus quatro melhores amigos fizeram até ele conhecer sua mãe.',
    //   classificacao: 'M/14',
    //   avaliacao: 4.2,
    //   nAvaliacoes: 6,
    //   comentarios: [],
    // },{ 
    //   nome: 'Friends',
    //   imagem: 'https://br.web.img3.acsta.net/r_1280_720/pictures/21/05/14/08/25/4008276.jpg',
    //   trailer: 'https://www.youtube.com/embed/nnn02NDIEiE',
    //   tipo: 'Serie',
    //   categoria: ['Comédia', 'Romance'],
    //   ano: 1994,
    //   realizador: ['David Crane', 'Marta Kauffman'],
    //   produtora: 'Warner Bros. Television',
    //   elenco: ['Jennifer Ani', 'Courteney Cox', 'Lisa Kudrow'],
    //   sinopse: 'Segue a vida pessoal e profissional de seis amigos de vinte a trinta e poucos anos que vivem em Manhattan.',
    //   classificacao: 'M/12',
    //   avaliacao: 4.4,
    //   nAvaliacoes: 6,
    //   comentarios: [],
    // },{ 
    //   nome: 'Modern Family',
    //   imagem: 'https://i.pinimg.com/originals/f0/f3/41/f0f34178d91a5b283e1ec39e982dc4b7.jpg',
    //   trailer: 'https://www.youtube.com/embed/X0lRjbrH-L8',
    //   tipo: 'Serie',
    //   categoria: ['Comédia', 'Drama', 'Romance'],
    //   ano: 2009,
    //   realizador: ['Jeffrey Morton', 'Chris Smirnoff'],
    //   produtora: 'Lloyd-Levitan Productions',
    //   elenco: ["Ed O'Neill", "Sofía Vergara", "Julie Bowen"],
    //   sinopse: 'Três famílias diferentes, mas relacionadas, enfrentam provações e tribulações em suas próprias maneiras cômicas.',
    //   classificacao: 'M/12',
    //   avaliacao: 4.2,
    //   nAvaliacoes: 6,
    //   comentarios: [],
    // },{ 
    //   nome: 'Mamma Mia',
    //   imagem: 'https://m.media-amazon.com/images/M/MV5BMTA2MDU0MjM0MzReQTJeQWpwZ15BbWU3MDYwNzgwNzE@._V1_FMjpg_UX1000_.jpg',
    //   trailer: 'https://www.youtube.com/embed/lkN-A00WLYE',
    //   tipo: 'Filme',
    //   categoria: ['Comédia', 'Musical', 'Romance'],
    //   ano: 2008,
    //   realizador: ['Phyllida Lloyd'],
    //   produtora: 'Relativity Media',
    //   elenco: ['Meryl Streep', 'Pierce Brosnan', 'Amanda Seyfried'],
    //   sinopse: 'A história de uma noiva tentando encontrar seu verdadeiro pai contada usando canções de sucesso do popular grupo ABBA dos anos 1970.',
    //   classificacao: 'M/6',
    //   avaliacao: 3.8,
    //   nAvaliacoes: 6,
    //   comentarios: [{
    //     utilizador: 'Rogério Fagundes',
    //     comentario: 'Um dos filmes que mais gosto, uma vez que usa as músicas da minha banda favorita, ABBA, enquanto nos cativa no inigma que desenrola toda a história.',
    //     spoiler: false,
    //   },{
    //     utilizador: 'Carla Queiros',
    //     comentario: 'Melhor filme musical que já vi na minha vida!!',
    //     spoiler: false,
    //   },],
    // },],

    // loggedIn: '',

    // desafios: localStorage.desafios ? JSON.parse(localStorage.desafios) : [{
    //   nome: 'Joga 5 jogos',
    //   nEtapas: 5,
    //   imagem: 'https://cdn-icons-png.flaticon.com/512/1910/1910528.png'
    // },
    // {
    //   nome: 'Joga 10 jogos',
    //   nEtapas: 10,
    //   imagem: 'https://cdn-icons-png.flaticon.com/512/1910/1910528.png'
    // },
    // {
    //   nome: 'Joga 20 jogos',
    //   nEtapas: 20,
    //   imagem: 'https://cdn-icons-png.flaticon.com/512/1910/1910528.png'
    // },
    // {
    //   nome: 'Joga 40 jogos',
    //   nEtapas: 40,
    //   imagem: 'https://cdn-icons-png.flaticon.com/512/1910/1910528.png'
    // },
    // {
    //   nome: 'Joga 50 jogos',
    //   nEtapas: 50,
    //   imagem: 'https://cdn-icons-png.flaticon.com/512/1910/1910528.png'
    // },
    // {
    //   nome: 'Joga 100 jogos',
    //   nEtapas: 100,
    //   imagem: 'https://cdn-icons-png.flaticon.com/512/1910/1910528.png'
    // },
    // {
    //   nome: 'Joga 75 jogos',
    //   nEtapas: 75,
    //   imagem: 'https://cdn-icons-png.flaticon.com/512/1910/1910528.png'
    // },]
  },

  getters: {
    // Utilizador
    isUser: (state) => (nome, palavra_passe) => state.utilizadores.some((user) => user.nome === nome && user.palavra_passe === palavra_passe),
    isUsernameAvailable: (state) => (nome) => state.utilizadores.every((user) => user.nome !== nome),
    getUtilizadores: (state) => state.utilizadores,
    getLoggedUser: (state) => state.loggedUser,

    // Jogos
    getJogos: (state) => state.jogos,
    isNomeJogoAvalido: (state) => (nome) => state.jogos.every((jogo) => jogo.nome !== nome),
    getTipoJogo: (state) => state.tipoJogo,

    // Filmes
    getFilmes: (state) => state.filmes,
    isNomeFilmeAvalido: (state) => (nome) => state.filmes.every((filme) => filme.nome !== nome),

    getCategoria: (state) => state.categorias,
    isCategoriaAvailable: (state) => (cat) => state.categorias.every((categoria) => categoria !== cat),

    isFilmeFavoritoValido: (state) => (nome) => state.loggedUser.favoritos.every((filme) => filme.nome !== nome),
    isFilmeListaValido: (state) => (nome) => state.loggedUser.lista.every((filme) => filme.nome !== nome),

    //Desafios
    getDesafios: (state) => state.desafios,
    isDesafioAvailable: (state) => (nome) => state.desafios.every((desafio) => desafio.nome !== nome),
  },

  mutations: {
    SET_MESSAGE(state, payload) {
      state.message = payload
    },

    // Utilizador
    SET_LOGGED_USER(state, payload) {
      // state.loggedUser = state.utilizadores.find((user) => user.nome === payload);
      // localStorage.loggedUser = JSON.stringify(state.loggedUser);
      state.loggedIn = true;
      state.loggedUser = payload;
    },
    // SET_NEW_USER(state, payload) {
    //   state.utilizadores.push(payload);
    //   state.loggedUser = state.utilizadores.find((user) => user.nome === payload);
    //   localStorage.utilizadores = JSON.stringify(state.utilizadores);
    // },
    loginFailure(state) {
      state.loggedIn = false;
      state.loggedUser = null;
    },
    SET_LOGOUT(state) {
      state.utilizadores.map((utilizador) => {
        if (utilizador.nome == state.loggedUser.nome) {
          utilizador = state.loggedUser
        }
      })
      // state.loggedUser = '';
      // localStorage.removeItem('loggedUser');
      state.loggedIn = false;
      state.loggedUser = null;
      localStorage.utilizadores = JSON.stringify(state.utilizadores);
    },
    // SET_NEW_PASSWORD(state, payload) {
    //   state.loggedUser = state.utilizadores.find((user) => user.palavra_passe === payload);
    //   localStorage.loggedUser = JSON.stringify(state.loggedUser);
    // },
    // SET_GERIR_UTILIZADORES(state, payload){
    //   state.utilizadores = payload;
    //   localStorage.utilizadores = JSON.stringify(state.utilizadores);
    // },
    SET_UTILIZADORES(state, payload) {
      console.log("STORE MUTATION SET_UTILIZADORES: " + payload.length)
      state.utilizadores = payload
    },
    SET_UTILIZADOR(state, payload) {
      console.log("STORE MUTATION SET_UTILIZADOR: ")
      console.log(payload.utilizador)
      state.utilizador = payload.utilizador
    },

    // Jogos
    // SET_NOVO_JOGO(state, payload) {
    //   state.jogos.push(payload);
    //   localStorage.jogos = JSON.stringify(state.jogos);
    // },
    // SET_REMOVER_JOGO(state, payload) {
    //   state.jogos = state.jogos.filter((jogo) => jogo.nome != payload)
    //   localStorage.jogos = JSON.stringify(state.jogos);
    // },
    // SET_NOVA_CLASSIFICACAO(state, payload) {
    //   state.jogos.map((jogo) => {
    //     if (jogo.nome == state.jogo) {
    //       if (jogo.classificacao.every((utilizador) => utilizador.utilizador !== payload.utilizador)) {
    //         jogo.classificacao.push(payload);
    //         state.loggedUser.numJogos += 1;
    //       }
    //       // else{
    //       //   jogo.classificacao.find((utilizador) => utilizador.utilizador == payload.utilizador) = payload
    //       // }
    //     }
    //   })

    //   localStorage.jogos = JSON.stringify(state.jogos);
    //   localStorage.loggedUser = JSON.stringify(state.loggedUser);
    // },
    SET_JOGOS(state, payload) {
      console.log("STORE MUTATION SET_JOGOS: " + payload.length)
      state.jogos = payload
    },
    SET_JOGO(state, payload) {
      state.jogo = payload
    },
    // SET_DESAFIO(state) {
    //   state.desafios.map((desafio) => {
    //     if (desafio.nEtapas == state.loggedUser.numJogos) {
    //       state.loggedUser.desafios.push(desafio)
    //     }
    //   })
    //   localStorage.loggedUser = JSON.stringify(state.loggedUser);
    // },

    // Filmes
    // SET_NOVO_FILME(state, payload) {
    //   state.filmes.push(payload);
    //   localStorage.filmes = JSON.stringify(state.filmes);
    // },
    // SET_REMOVER_FILME(state, payload) {
    //   state.filmes = state.filmes.filter((filme) => filme.nome != payload);
    //   localStorage.filmes = JSON.stringify(state.filmes);
    // },
    // SET_NOVA_CATEGORIA(state, payload) {
    //   state.categoria.push(payload);
    //   localStorage.categoria = JSON.stringify(state.categoria);
    // },
    SET_FILMES(state, payload) {
      console.log("STORE MUTATION SET_FILMES: " + payload.length)
      state.filmes = payload
    },
    SET_FILME(state, payload) {
      state.filme = payload
    },
    // SET_NOVA_AVALIACAO(state, payload) {
    //   state.filmes.map((filme) => {
    //     if (filme.nome == state.filme) {
    //       filme.avaliacao *= filme.nAvaliacoes;
    //       filme.avaliacao += payload;
    //       filme.nAvaliacoes++;
    //       filme.avaliacao /= (filme.nAvaliacoes);
    //       filme.avaliacao = filme.avaliacao.toFixed(1);
    //     }
    //   })
    //   localStorage.filmes = JSON.stringify(state.filmes);
    // },
    // SET_NOVO_COMENTARIO(state, payload) {
    //   state.filmes.map((filme) => {
    //     if (filme.nome == state.filme) {
    //       filme.comentarios.push(payload);
    //     }
    //   })
    //   localStorage.filmes = JSON.stringify(state.filmes);
    // },
    // SET_SPOILER(state) {
    //   localStorage.filmes = JSON.stringify(state.filmes);
    // },
    // SET_NOVO_FAVORITO(state, payload) {
    //   state.filmes.map((filme) => {
    //     if (filme.nome == payload) {
    //       state.loggedUser.favoritos.push(filme)
    //     }
    //   })
    //   localStorage.loggedUser = JSON.stringify(state.loggedUser);
    // },
    // SET_NOVA_LISTA(state, payload) {
    //   state.filmes.map((filme) => {
    //     if (filme.nome == payload) {
    //       state.loggedUser.lista.push(filme)
    //     }
    //   })
    //   localStorage.loggedUser = JSON.stringify(state.loggedUser);
    // },

    // Categorias
    SET_CATEGORIAS(state, payload) {
      console.log("STORE MUTATION SET_CATEGORIAS: " + payload.length)
      state.categorias = payload
    },

    // Desafios
    SET_DESAFIOS(state, payload) {
      console.log("STORE MUTATION SET_DESAFIOS: " + payload.length)
      state.desafios = payload
    },


    // SET_NOVO_DESAFIO(state, payload) {
    //   state.desafios.push(payload);
    //   localStorage.desafios = JSON.stringify(state.desafios);
    // },
  },
  actions: {
    async getAPIRoot({ commit }) {
      const result = await UtilizadorService.getPublicContent()
      commit("SET_MESSAGE", result.message);
    },

    // utilizadores
    async register({ commit }, utilizador) {
      try {
        const response = await AutenticadoService.register(utilizador);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async login({ commit }, utilizador) {
      try {
        const loggedUser = await AutenticadoService.login(utilizador);
        commit('loginSuccess', loggedUser);
      }
      catch (error) {
        commit('loginFailure');
        throw error;
      }
    },

    async getAllUtilizadores({ commit }) {
      try {
        const utilizadores = await UtilizadorService.fetchAllUtilizadores();
        commit('SET_Utilizadores', utilizadores);
      }
      catch (error) {
        commit('SET_Utilizadores', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    async getUtilizador({ commit }, id) {
      try {
        const utilizador = await UtilizadorService.fetchOneUtilizadorByID(id);
        commit('SET_Utilizador', utilizador);
      }
      catch (error) {
        commit('SET_Utilizador', null);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    logout({ commit }) {
      AutenticadoService.logout();
      // commit mutation logout
      commit('logout');
    },

    async eliminarUtilizador({ commit }, id) {
      try {
        const response = await UtilizadorService.eliminarUtilizador(id);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async updateUtilizador({ commit }, id, utilizador) {
      try {
        const response = await UtilizadorService.updateUtilizador( id, utilizador);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async addFavoritos({ commit }, id, filmeID) {
      try {
        const response = await UtilizadorService.addFavoritos(id, filmeID);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async addLista({ commit }, id, filmeID) {
      try {
        const response = await UtilizadorService.addLista(id, filmeID);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async addDesafio({ commit }, id, jogoID) {
      try {
        const response = await UtilizadorService.addDesafio(id, jogoID);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async addDesafioConcluido({ commit }, id, desafioID) {
      try {
        const response = await UtilizadorService.addDesafioConcluido(id, desafioID);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    // filmes
    async getAllFilmes({ commit }) {
      try {
        const filmes = await FilmeService.fetchAllFilmes();
        commit('SET_Filmes', filmes);
      }
      catch (error) {
        commit('SET_Filmes', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    async getFilme({ commit }, id) {
      try {
        const filme = await FilmeService.fetchOneFilmeByID(id);
        commit('SET_FILME', filme);
      }
      catch (error) {
        commit('SET_FILME', null);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    async novoFilme({ commit }, filme) {
      try {
        const response = await FilmeService.adicionarFilme(filme);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async eliminarFilme({ commit }, id) {
      try {
        const response = await FilmeService.eliminarFilme(id);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async addComentario({ commit }, id, comentario) {
      try {
        const response = await FilmeService.addComentario(id, comentario);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async updateComentario({ commit }, filmeID, comentarioID, comentario) {
      try {
        const response = await FilmeService.updateComentario(filmeID, comentarioID, comentario);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async updateAvaliacao({ commit }, id, avaliacao) {
      try {
        const response = await FilmeService.updateAvaliacao(id, avaliacao);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    // Categorias
    async getAllCategorias({ commit }) {
      try {
        const jogos = await CategoriaService.fetchAllCategorias();
        commit('SET_CATEGORIAS', jogos);
      }
      catch (error) {
        commit('SET_CATEGORIAS', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    async adicionarCategoria({ commit }, categoria) {
      try {
        const response = await CategoriaService.adicionarCategoria(categoria);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    // Jogos
    async getAllJogos({ commit }) {
      try {
        const jogos = await JogoService.fetchAllJogos();
        commit('SET_JOGOS', jogos);
      }
      catch (error) {
        commit('SET_JOGOS', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    async getJogo({ commit }, id) {
      try {
        const jogo = await JogoService.fetchOneJogosByID(id);
        commit('SET_JOGO', jogo);
      }
      catch (error) {
        commit('SET_JOGO', null);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    async novoJogo({ commit }, jogo) {
      try {
        const response = await JogoService.adicionarJogo(jogo);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async eliminarJogo({ commit }, id) {
      try {
        const response = await JogoService.eliminarJogo(id);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async getClassificacao({ commit }, id) {
      try {
        const jogo = await JogoService.fetchAllClassificacoes(id);
        commit('SET_JOGO', jogo);
      }
      catch (error) {
        commit('SET_JOGO', null);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    async addClassificacao({ commit }, id, jogo) {
      try {
        const response = await JogoService.addClassificacao(id, jogo);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    // Desafios
    async getAllDesafios({ commit }) {
      try {
        const desafios = await DesafioService.fetchAllDesafios();
        commit('SET_DESAFIOS', desafios);
      }
      catch (error) {
        commit('SET_DESAFIOS', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    async getDesafio({ commit }, id) {
      try {
        const desafio = await DesafioService.fetchOneDesafioByID(id);
        commit('SET_DESAFIOS', desafio);
      }
      catch (error) {
        commit('SET_DESAFIOS', null);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    async adicionarDesafio({ commit }, desafio) {
      try {
        const response = await DesafioService.adicionarDesafio(desafio);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },
  },
  modules: {}
})