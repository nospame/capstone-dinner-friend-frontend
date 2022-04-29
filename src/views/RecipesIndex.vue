<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to the Recipes Index Page",
      recipes: [],
      searchTerm: '',
      offset: 0
    };
  },
  created: function () {
    this.getRecipes()
  },
  methods: {
    newSearch: function () {
      this.offset = 0
      this.getRecipes()
    },
    getRecipes: function () {
      axios.get(`/recipes.json?query=${this.searchTerm}&offset=${this.offset}`)
        .then(response => {
          this.recipes = response.data
        })
    },
    showRecipe: function (id) {
      this.$router.push(`/recipes/${id}`)
    },
    nextPage: function () {
      this.offset += 20
      this.getRecipes()
      window.scrollTo(0, 0)
    },
    prevPage: function () {
      this.offset -= 20
      this.getRecipes()
      window.scrollTo(0, 0)
    }
  },
};
</script>

<template>
  <div class="recipes-index">
    <h1>{{ message }}</h1>
    <form v-on:submit.prevent="newSearch()"> <input type="text" v-model="searchTerm"> <input type="submit"
        value="Search">
    </form>
    <div v-for="recipe in recipes">
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
      <button v-on:click="showRecipe(recipe.id)">Recipe Details</button>
      <hr />
    </div>
    <button v-if="offset > 0" v-on:click="prevPage()">Previous Page</button>
    <button v-if="recipes.length === 20" v-on:click="nextPage()">Next Page</button>
  </div>
</template>

<style>
</style>