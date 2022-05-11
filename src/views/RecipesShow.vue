<script>
import axios from "axios";
import { user } from '../user.js'

export default {
  data: function () {
    return {
      message: "Recipe Details",
      recipe: {},
      notify: '',
      user
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
    },
    favoriteRecipe: function () {
      axios.post('/favorite_recipes.json', { "recipe_id": this.recipe.id })
        .then(
          this.notify = 'Recipe added to favorites',
          this.recipe.favorited = true
        )
    },
    unfavoriteRecipe: function () {
      axios.delete(`/favorite_recipes/${this.recipe.id}.json`)
        .then(
          this.notify = 'Recipe removed from favorites',
          this.recipe.favorited = false,
          this.recipe.has_made = false
        )
    },
    markCooked: function () {
      axios.patch(`/favorite_recipes/${this.recipe.id}.json`, { "has_made": true })
        .then(
          this.notify = 'Recipe marked as cooked.',
          this.recipe.has_made = true
        )
    }
  }
};
</script>

<template>
  <div class="recipes-show">
    <h1>{{ message }}</h1>
    <div>
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
      <button class="btn btn-primary btn-sm" v-if="recipe.favorited == false"
        v-on:click="favoriteRecipe()">Favorite</button>
      <button class="btn btn-primary btn-sm" v-if="!!recipe.favorited"
        v-on:click="unfavoriteRecipe()">Unfavorite</button>
      <button class="btn btn-primary btn-sm" v-if="!!recipe.favorited && !recipe.has_made"
        v-on:click="markCooked()">Cook recipe!</button>
      <button class="btn btn-success btn-sm disabled" v-if="!!recipe.favorited && !!recipe.has_made">Recipe
        cooked!</button>
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
      <!-- <p><a href="https://www.wine-searcher.com/food-wine" target="_blank">Information on Wine Pairings</a></p> -->
    </div>
  </div>
</template>

<style>
</style>