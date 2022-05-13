import { createRouter, createWebHistory } from 'vue-router'
import FavoriteRecipes from '../views/FavoriteRecipes.vue'
import FavoriteSearches from '../views/FavoriteSearches.vue'
import RecipesIndex from '../views/RecipesIndex.vue'
import RecipesShow from '../views/RecipesShow.vue'
import UsersNew from '../views/UsersNew.vue'
import UserLogin from '../views/UserLogin.vue'
import UserLogout from '../views/UserLogout.vue'

const routes = [
  {
    path: '/',
    redirect: {
      name: 'recipes-index'
    }
  },
  {
    path: '/recipes',
    name: 'recipes-index',
    component: RecipesIndex
  },
  {
    path: '/recipes/:id',
    name: 'recipes-show',
    component: RecipesShow
  },
  {
    path: '/favorites/recipes',
    name: 'favorite-recipes',
    component: FavoriteRecipes
  },
  {
    path: '/favorites/searches',
    name: 'favorite-searches',
    component: FavoriteSearches
  },
  {
    path: '/users/new',
    name: 'users-new',
    component: UsersNew
  },
  {
    path: '/login',
    name: 'user-login',
    component: UserLogin
  },
  {
    path: '/logout',
    name: 'user-logout',
    component: UserLogout
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
