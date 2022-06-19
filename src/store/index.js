import Vue from 'vue'
import Vuex from 'vuex'

import { UtilizadorService } from '@/services/utilizador.service';
import { AutenticadoService } from '../services/autenticado.service';
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
    loggedIn: localStorage.utilizador ? true : false,
    loggedUser: localStorage.utilizador ? JSON.parse(localStorage.utilizador) : null,

    // Jogos
    jogos: [],
    jogo: null,
    tipoJogo: ['Quizz', 'Preencher', 'Lista'],

    // Filmes
    filmes: [],
    filme: null,

    // Categorias
    categorias: [],
    // categoria: localStorage.categoria ? JSON.parse(localStorage.categoria) : ['Ação', 'Comédia', 'Drama', 'Musical', 'Aventura', 'Romance'],

    // Desafios
    desafios: [],
  },

  getters: {
    getMessage: (state) => state.message,

    // Utilizador
    isUser: (state) => (nome, palavra_passe) => state.utilizadores.some((user) => user.nome === nome && user.palavra_passe === palavra_passe),
    isUsernameAvailable: (state) => (nome) => state.utilizadores.every((user) => user.nome !== nome),
    getUtilizadores: (state) => state.utilizadores,
    getUtilizador: (state) => state.utilizador,
    getLoggedIn: (state) => state.loggedIn,
    getLoggedUser: (state) => state.loggedUser,

    // Jogos
    getJogos: (state) => state.jogos,
    getJogo: (state) => state.jogo,
    isNomeJogoAvalido: (state) => (nome) => state.jogos.every((jogo) => jogo.nome !== nome),
    getTipoJogo: (state) => state.tipoJogo,

    // Filmes
    getFilmes: (state) => state.filmes,
    getFilme: (state) => state.filme,
    isNomeFilmeAvalido: (state) => (nome) => state.filmes.every((filme) => filme.nome !== nome),

    getCategoria: (state) => state.categorias,
    isCategoriaAvailable: (state) => (cat) => state.categorias.every((categoria) => categoria.categoria !== cat),

    isFilmeFavoritoValido: (state) => (nome) => state.utilizador.favoritos.every((filme) => filme.nome !== nome),
    isFilmeListaValido: (state) => (nome) => state.utilizador.lista.every((filme) => filme.nome !== nome),

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
      state.loggedIn = true;
      state.loggedUser = payload;
    },

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
      state.loggedIn = false;
      state.loggedUser = null;
    },

    SET_UTILIZADORES(state, payload) {
      // console.log("STORE MUTATION SET_UTILIZADORES: " + payload.length)
      state.utilizadores = payload
    },
    SET_UTILIZADOR(state, payload) {
      // console.log("STORE MUTATION SET_UTILIZADOR: ")
      // console.log(payload.utilizador)
      state.utilizador = payload.utilizador
    },

    // Jogos
    SET_JOGOS(state, payload) {
      // console.log("STORE MUTATION SET_JOGOS: " + payload.length)
      state.jogos = payload
    },
    SET_JOGO(state, payload) {
      state.jogo = payload
    },

    // Filmes
    SET_FILMES(state, payload) {
      // console.log("STORE MUTATION SET_FILMES: " + payload.length)
      state.filmes = payload
    },
    SET_FILME(state, payload) {
      state.filme = payload
    },

    // Categorias
    SET_CATEGORIAS(state, payload) {
      // console.log("STORE MUTATION SET_CATEGORIAS: " + payload.length)
      state.categorias = payload
    },

    // Desafios
    SET_DESAFIOS(state, payload) {
      // console.log("STORE MUTATION SET_DESAFIOS: " + payload.length)
      state.desafios = payload
    },
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
        commit('SET_LOGGED_USER', loggedUser);
      }
      catch (error) {
        commit('loginFailure');
        throw error;
      }
    },

    async getAllUtilizadores({ commit }) {
      try {
        const utilizadores = await UtilizadorService.fetchAllUtilizadores();
        commit('SET_UTILIZADORES', utilizadores);
      }
      catch (error) {
        commit('SET_UTILIZADORES', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    async getUtilizador({ commit }, id) {
      try {
        const utilizador = await UtilizadorService.fetchOneUtilizadorByID(id);
        commit('SET_UTILIZADOR', utilizador);
      }
      catch (error) {
        commit('SET_UTILIZADOR', null);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
      }
    },

    logout({ commit }) {
      AutenticadoService.logout();
      // commit mutation logout
      commit('SET_LOGOUT');
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

    async updateUtilizador({ commit }, payload) {
      try {
        const response = await UtilizadorService.updateUtilizador(payload[0], payload[1]);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async addFavoritos({ commit }, payload) {
      try {
        const response = await UtilizadorService.addFavoritos(payload[0], payload[1]);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async addLista({ commit }, payload) {
      try {
        const response = await UtilizadorService.addLista(payload[0], payload[1]);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async addDesafio({ commit }, payload) {
      try {
        const response = await UtilizadorService.addDesafio(payload[0], payload[1]);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async addDesafioConcluido({ commit }, payload) {
      let desafioConcluido = false
      let des
      payload[1].map((desafio) => {
        if (desafio.nEtapas == payload[0].desafios.length + 1) {
          desafioConcluido = true;
          des = desafio
        }
      })
      if(desafioConcluido){
        try {
          console.log(payload[0]._id);
          console.log(des._id);
          const response = await UtilizadorService.addDesafioConcluido(payload[0]._id, des._id);
          commit('SET_MESSAGE', response.msg);
        }
        catch (error) {
          commit('SET_MESSAGE', '');
          throw error;
        }
      }
    },

    // filmes
    async getAllFilmes({ commit }) {
      try {
        const filmes = await FilmeService.fetchAllFilmes();
        commit('SET_FILMES', filmes);
      }
      catch (error) {
        commit('SET_FILMES', []);
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
        commit('SET_FILME', response.id)
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

    async addComentario({ commit }, payload) {
      try {
        const response = await FilmeService.addComentario(payload[0], payload[1]);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async updateComentario({ commit }, payload) {
      try {
        const response = await FilmeService.updateComentario(payload[0], payload[1], payload[2]);
        commit('SET_MESSAGE', response.msg);
      }
      catch (error) {
        commit('SET_MESSAGE', '');
        throw error;
      }
    },

    async updateAvaliacao({ commit }, payload) {
      try {
        const response = await FilmeService.updateAvaliacao(payload[0], payload[1]);
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
        commit('SET_JOGO', response.id);
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

    async addClassificacao({ commit }, payload) {
      try {
        const response = await JogoService.addClassificacao(payload[0], payload[1]);
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
})