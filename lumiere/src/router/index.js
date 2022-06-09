import Vue from 'vue'
import VueRouter from 'vue-router'
import PaginaInicial from '../views/paginaInicial.vue'
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
    component: () => import(/* webpackChunkName: "filmes" */ '../views/filmes.vue'),
  },
  {
    // Pagina com informacoes do filme
    path: '/filmes/:filmeInfo',
    name: 'filme',
    component: () => import(/* webpackChunkName: "filme" */ '../views/filme.vue'),
  },
  {
    // Pagina com o catologo de jogos
    path: '/jogos',
    name: 'jogos',
    component: () => import(/* webpackChunkName: "jogos" */ '../views/jogos.vue'),
    meta: {
      requerAutenticacao: true,
    },
  },
  {
    // Pagina com o jogo
    path: '/jogos/:jogo',
    name: 'jogo',
    component: () => import(/* webpackChunkName: "jogo" */ '../views/jogo.vue'),
    meta: {
      requerAutenticacao: true,
    },
  },
  {
    // Pagina com a classificacao dos jogadores
    path: '/jogos/:classificacao',
    name: 'classificacao',
    component: () => import(/* webpackChunkName: "classificacao" */'../views/classificacao.vue'),
  },
  {
    // Pagina de perfil
    path: '/perfil',
    name: 'perfil',
    component: () => import(/* webpackChunkName: "perfil" */'../views/perfil.vue'),
    meta: {
      requerAutenticacao: true,
    },
  },
  {
    // Pagina que fala sobre o site
    path: '/sobreNos',
    name: 'sobreNos',
    component: () => import/* webpackChunkName: "sobreNos" */ ('../views/sobreNos.vue'),
  },
  {
    // Pagina com o catologo de jogos
    path: '/adicionarFilme',
    name: 'adicionarFilme',
    component: () => import(/* webpackChunkName: "adicionarFilme" */ '../views/adicionarFilme.vue'),
    meta: {
      requerAutenticacao: true,
    },
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
