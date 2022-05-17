<script>
import axios from 'axios';
import { user } from '../user.js'

export default {
  data: function () {
    return {
      message: "Welcome to the Favorites Page",
      favorites: [],
      sort: 'new',
      filter: 'all',
      selectFavorites: this.favorites,
      user
    };
  },
  created: function () {
    this.getFavoriteRecipes()
  },
  methods: {
    getFavoriteRecipes: function () {
      axios.get("/favorite_recipes.json")
        .then(response => {
          console.log(response.data)
          this.favorites = response.data
          this.selectFavorites = this.favorites
        })
    },
    showRecipe: function (id) {
      this.$router.push(`/recipes/${id}`)
    },
    selectFavoriteRecipes: function (sort, filter) {
      this.sortFavoriteRecipes(sort);
      this.filterFavoriteRecipes(filter);
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
    filterFavoriteRecipes: function (filter) {
      if (filter === 'true') {
        this.selectFavorites = this.selectFavorites.filter(favorite => favorite.has_made === true)
      }
      else if (filter === 'false') {
        this.selectFavorites = this.selectFavorites.filter(favorite => favorite.has_made === false)
      }
    }
  },
};
</script>

<template>
  <div class="favorites m-auto" style="max-width: 960px">
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
        <h2>{{ favorite.recipe.name }}</h2>
        <p>{{ favorite.recipe.description }}</p>
        <button class="btn btn-primary position-relative" v-on:click="showRecipe(favorite.recipe.id)">Recipe Details
          <span
            class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
            v-if="!favorite.has_made">
            <span class="visually-hidden">New to Favorites</span>
          </span></button>

        <hr />
      </div>
    </div>
    <div v-else="favorites.length === 0">
      <p>Nothing to see here! Try adding some favorites from the search page.</p>
    </div>
  </div>
</template>

<style>
</style>