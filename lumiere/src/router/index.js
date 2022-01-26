import Vue from 'vue'
import VueRouter from 'vue-router'
import PaginaInicial from '../views/paginaInicial.vue'
import Filmes from '../views/filmes.vue'
import Filme from '../views/filme.vue'
import Jogos from '../views/jogos.vue'
import Jogo from '../views/jogo.vue'
import Classificacao from '../views/classificacao.vue'
import Perfil from '../views/perfil.vue'
import SobreNos from '../views/sobreNos.vue'

import store from "../store/index.js";

Vue.use(VueRouter)

const routes = [
  {
    // Pagina inicial do site
    path: '/',
    name: 'paginaInicial',
    component: PaginaInicial,
  },
  {
    // Pagina com o catologo de filmes
    path: '/filmes',
    name: 'filmes',
    component: Filmes,
  },
  {
    // Pagina com informacoes do filme
    path: '/filmes/:filmeInfo',
    name: 'filme',
    component: Filme,
  },
  {
    // Pagina com o catologo de jogos
    path: '/jogos',
    name: 'jogos',
    component: Jogos,
    meta: {
      requerAutenticacao: true,
    },
  },
  {
    // Pagina com o jogo
    path: '/jogos/:jogo',
    name: 'jogo',
    component: Jogo,
    meta: {
      requerAutenticacao: true,
    },
  },
  {
    // Pagina com a classificacao dos jogadores
    path: '/jogos/:classificacao',
    name: 'classificacao',
    component: Classificacao,
  },
  {
    // Pagina de perfil
    path: '/perfil',
    name: 'perfil',
    component: Perfil,
    meta: {
      requerAutenticacao: true,
    },
  },
  {
    // Pagina que fala sobre o site
    path: '/sobreNos',
    name: 'sobreNos',
    component: SobreNos,
  },
  {
		// Todos as rotas que não sejam as que estão acima definidas é lhes mostrada a página de erro
		path: '*',
		name: 'Error',
		component: Error,
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requerAutenticacao && !store.getters.getLoggedUser) {
    alert('É preciso autenticar primeiro!')
    } else {
    next();
  }
});



export default router
