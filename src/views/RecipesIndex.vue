<script>
import axios from "axios"
import Multiselect from '@vueform/multiselect'

export default {
  components: { Multiselect },

  created: function () {
    // this.getRecipes()
    this.getTags()
  },

  data: function () {
    return {
      message: "Dinner Party's Friend",
      tags: [],
      recipes: [],
      searchTerm: '',
      offset: 0,
      value: null,
      options: ['list', 'of', 'options']
    };
  },

  methods: {
    getTags: function () {
      axios.get('/tags.json')
        .then(response => {
          this.tags = response.data
        })
    },
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
    <div>
      <multiselect v-model="value" :options="options"></multiselect>
    </div>
    <h1>{{ message }}</h1>
    <p>Search for an ingredient or keyword</p>
    <form v-on:submit.prevent="newSearch()">
      <input type="text" v-model="searchTerm">
      <input class="btn btn-primary" type="submit" value="Search">
    </form>
    <div v-for="recipe in recipes">
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
      <button class="btn btn-primary" v-on:click="showRecipe(recipe.id)">Recipe Details</button>
      <hr />
    </div>
    <button class="btn btn-secondary" v-if="offset > 0" v-on:click="prevPage()">Previous Page</button>
    <button class="btn btn-secondary" v-if="recipes.length === 20" v-on:click="nextPage()">Next Page</button>
  </div>
</template>



<style>
</style>