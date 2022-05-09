<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Recipe Details",
      recipe: {},
      notify: ''
    };
  },
  created: function () {
    this.showRecipe()
  },
  methods: {
    showRecipe: function () {
      axios.get(`/recipes/${this.$route.params.id}.json`)
        .then(response => {
          this.recipe = response.data
          console.log(response.data)
        })
    },
    shareRecipe: function () {
      const copyText = window.location.href
      navigator.clipboard.writeText(copyText)
      this.notify = 'URL copied to clipboard'
      setTimeout(() => { this.notify = '' }, 5000)
    }
  },
};
</script>

<template>
  <div class="recipes-show">
    <h1>{{ message }}</h1>
    <div>
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
      <h3>Ingredients</h3>
      <ul>
        <li v-for="ingredient in recipe.ingredients_list">{{ ingredient }}</li>
      </ul>
      <h3>Directions</h3>
      <ol>
        <li v-for="step in recipe.steps">{{ step.description }}</li>
      </ol>

      <p>
        {{ notify }}</p>
      <div>
        <button class="btn btn-secondary" v-on:click="shareRecipe()">Share Recipe</button>
        <router-link class="btn btn-primary" to="/recipes">Back to Recipes</router-link>
      </div>
      <p><a href="https://www.wine-searcher.com/food-wine" target="_blank">Information on Wine Pairings</a></p>
    </div>
  </div>
</template>

<style>
</style>