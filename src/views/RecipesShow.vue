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
    console.log(this.recipe)
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
      this.notify = 'URL copied to clipboard!'
      setTimeout(() => { this.notify = '' }, 5000)
    },
    favoriteRecipe: function () {
      axios.post('/favorite_recipes.json', { "recipe_id": this.recipe.id })
        .then(() => {
          this.notify = 'Recipe favorited!'
          setTimeout(() => { this.notify = '' }, 5000)
          this.recipe.favorited = true
        }
        )
    },
    unfavoriteRecipe: function () {
      axios.delete(`/favorite_recipes/${this.recipe.id}.json`)
        .then(() => {
          this.notify = 'Recipe removed from favorites'
          setTimeout(() => { this.notify = '' }, 5000)
          this.recipe.favorited = false
          this.recipe.has_made = false
        })
    },
    markCooked: function () {
      axios.patch(`/favorite_recipes/${this.recipe.id}.json`, { "has_made": true })
        .then(() => {
          this.notify = 'Recipe marked as cooked.'
          setTimeout(() => { this.notify = '' }, 4000)
          this.recipe.has_made = true
        })
    }
  }
};
</script>

<template>
  <div class="recipes-show m-auto" style="max-width: 720px">
    <h1 class="display-3 text-center m-5">{{ message }}</h1>
    <div class="container m-3 border rounded">
      <section class="row mx-1 my-3 align-items-end" id="information">
        <h2>{{ recipe.name }} <button class="btn btn-outline-success btn-sm" v-if="recipe.favorited == false"
            v-on:click="favoriteRecipe()">&#9734;</button>
          <button class="btn btn-outline-success btn-sm" v-else-if="!!recipe.favorited"
            v-on:click="unfavoriteRecipe()">&#9733;</button>
          <button class="btn btn-outline-success btn-sm disabled" v-else="!user.loggedIn">&#9734;</button>
        </h2>
        <p><small>Serves {{ recipe.servings }}.</small></p>
        <p>{{ recipe.description }}</p>
        <p v-if="notify != ''" class="small text-center" role="alert">
          {{ notify }}<br />
        </p>
        <div class="row">
          <div class="col-auto ms-auto">
            <button class="btn btn-success btn-sm" v-if="!!recipe.favorited && !recipe.has_made"
              v-on:click="markCooked()">Cooked it?</button>
            <button class="btn btn-success btn-sm disabled" v-if="!!recipe.favorited && !!recipe.has_made">Recipe
              cooked!</button>
          </div>
          <div class="col-auto me-auto">
            <button class="btn btn-secondary btn-sm" v-on:click="shareRecipe()">Share it!</button>
          </div>
        </div>
      </section>
      <section class="row m-3 p-3 border-top" id="ingredients">
        <h3>Ingredients</h3>
        <ul>
          <li v-for="ingredient in recipe.ingredients_list">{{ ingredient }}</li>
        </ul>
      </section>
      <section class="row mx-3 p-3 border-top" id="directions">
        <h3>Directions</h3>
        <ol>
          <li v-for="step in recipe.steps">{{ step.description }}</li>
        </ol>
      </section>
    </div>
    <div class="row">
      <div class="col-auto me-auto">
        <router-link class="btn btn-secondary" to="/recipes">All Recipes</router-link>
      </div>
      <div class="col-auto ms-auto">
        <button class="btn btn-primary my-1 mx-4">Something</button>
      </div>
    </div>
  </div>
</template>

<style>
</style>