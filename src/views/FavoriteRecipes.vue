<script>
import axios from 'axios';
import { user } from '../user.js'

export default {
  data: function () {
    return {
      user,
      favorites: [],
      filter: 'all',
      selectFavorites: this.favorites,
      sort: 'new'
    };
  },
  created: function () {
    this.getFavoriteRecipes()
  },
  methods: {
    getFavoriteRecipes: function () {
      axios.get("/favorite_recipes.json")
        .then(response => {
          this.favorites = response.data
          this.selectFavorites = this.favorites
        })
    },
    unfavoriteRecipe: function (favorite) {
      axios.delete(`/favorite_recipes/${favorite.recipe.id}`)
        .then(() => {
          this.favorites.splice(this.favorites.indexOf(favorite), 1)
          this.selectFavorites.splice(this.selectFavorites.indexOf(favorite), 1)
        })
    },
    filterFavoriteRecipes: function (filter) {
      if (filter === 'true') {
        this.selectFavorites = this.selectFavorites.filter(favorite => favorite.has_made === true)
      }
      else if (filter === 'false') {
        this.selectFavorites = this.selectFavorites.filter(favorite => favorite.has_made === false)
      }
    },
    selectFavoriteRecipes: function (sort, filter) {
      this.sortFavoriteRecipes(sort);
      this.filterFavoriteRecipes(filter);
    },
      showRecipe: function (favorite) {
        this.$router.push(`/recipes/${favorite.recipe.id}`)
      },
    sortFavoriteRecipes: function (sort) {
      this.selectFavorites = this.favorites.sort((a, b) => {
        if (sort === 'old' || sort === 'new') {
          let da = new Date(a.created_at),
            db = new Date(b.created_at);
          if (sort === 'old') {
            return da - db;
          } else {
            return db - da;
          }
        }
        else if (sort === 'asc' || sort === 'desc') {
          let ra = a.recipe.name.toLowerCase(),
            rb = b.recipe.name.toLowerCase();
          if (sort === 'asc') {
            if (ra < rb) {
              return -1;
            }
            if (ra > rb) {
              return 1;
            }
            return 0;
          } else {
            if (rb < ra) {
              return -1;
            }
            if (rb > ra) {
              return 1;
            }
            return 0;
          }
        }
      })
    },
  },
};
</script>

<template>
  <div class="favorite-recipes m-auto" style="max-width: 960px">
    <h1 class="display-3 text-center m-5">Favorites</h1>
    <div v-if="favorites.length > 0" class="container m-auto">
      <div class="mb-3 row">
        <div class="col mb-3">
          <label for="sort" class="form-label">Sort:</label>
          <select id="sort" class="form-select form-select-sm" v-model="sort"
            v-on:change="selectFavoriteRecipes(sort, filter)">
            <option value="new" selected>Newest Added</option>
            <option value="old">Oldest Added</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>
        <div class="col mb-3">
          <label for="filter" class="form-label">Filter:</label>
          <select id="filter" v-model="filter" class="form-select form-select-sm"
            v-on:change="selectFavoriteRecipes(sort, filter)">
            <option value="all" selected>All Favorites</option>
            <option value="false">Need to Make</option>
            <option value="true">Already Made</option>
          </select>
        </div>
      </div>

      <div v-for="favorite in selectFavorites">
        <div class="row">
          <div class="col-auto">
            <h2>{{ favorite.recipe.name }}</h2>
          </div>
          <div class="col-auto ms-auto">
            <button type="button" class="btn-close" v-on:click="unfavoriteRecipe(favorite)"></button>
          </div>
        </div>
        <p>{{ favorite.recipe.description.slice(0, 200) }}<span
            v-if="favorite.recipe.description.length > 200">...</span></p>
        <button class="btn btn-primary position-relative" v-on:click="showRecipe(favorite)">Recipe Details
          <span
            class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
            v-if="!favorite.has_made">
            <span class="visually-hidden">New</span>
          </span></button>
        <hr />
      </div>
    </div>
    <div v-else="favorites.length === 0">
      <p class="text-center">Nothing to see here! Try finding some recipes to favorite from the <router-link
          to="/recipes">search page</router-link>.</p>
    </div>
  </div>
</template>

<style>
</style>