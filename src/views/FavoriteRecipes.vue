<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Welcome to the Favorites Page",
      favorites: [],
      sort: ''
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
        })
    },
    showRecipe: function (id) {
      this.$router.push(`/recipes/${id}`)
    },
    sortFavoriteRecipes: function (sort) {
      switch (sort) {
        case 'old':
          this.favorites = this.favorites.sort((a, b) => {
            let da = new Date(a.created_at),
              db = new Date(b.created_at);
            return da - db;
          })
          break
        case 'new':
          this.favorites = this.favorites.sort((a, b) => {
            let da = new Date(a.created_at),
              db = new Date(b.created_at);
            return db - da;
          })
          break
        case 'asc':
          this.favorites = this.favorites.sort((a, b) => {
            let ra = a.recipe.name.toLowerCase(),
              rb = b.recipe.name.toLowerCase();
            if (ra < rb) {
              return -1;
            }
            if (ra > rb) {
              return 1;
            }
            return 0;
          });
          break
        case 'desc':
          this.favorites = this.favorites.sort((a, b) => {
            let ra = a.recipe.name.toLowerCase(),
              rb = b.recipe.name.toLowerCase();
            if (rb < ra) {
              return -1;
            }
            if (rb > ra) {
              return 1;
            }
            return 0;
          });
          break
      }
    }
  },
};
</script>

<template>
  <div class="favorites">
    <label for="sort">Sort by:</label>
    <select id="sort" v-model="sort">
      <option value="new">Newest</option>
      <option value="old">Oldest</option>
      <option value="asc">A - Z</option>
      <option value="desc">Z - A</option>
    </select>
    <button class="btn btn-primary btn-sm" v-on:click="sortFavoriteRecipes(sort)">Sort and Filter</button>
    <div v-for="favorite in favorites">
      <h2>{{ favorite.recipe.name }}</h2>
      <p>{{ favorite.recipe.description }}</p>
      <button class="btn btn-primary position-relative" v-on:click="showRecipe(favorite.recipe.id)">Recipe Details <span
          class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
          v-if="!favorite.has_made">
          <span class="visually-hidden">New to Favorites</span>
        </span></button>

      <hr />
    </div>
  </div>
</template>

<style>
</style>