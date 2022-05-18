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
    },
    print: function () {
      window.print()
    }
  }
};
</script>

<template>
  <div class="recipes-show m-auto" style="max-width: 720px">
    <h1 class="display-3 text-center m-5 no-print">{{ message }}</h1>
    <div class="container m-3 border rounded print-content" style="background-color: #fff">

      <section class="row mx-1 my-3 print-content" id="information">
        <div class="col-10">
          <h2>{{ recipe.name }}</h2>
        </div>
        <div class="col-auto ms-auto">
          <button class="btn btn-outline-success rounded-circle py-2" v-if="recipe.favorited == false"
            v-on:click="favoriteRecipe()">&#9734;</button>
          <button class="btn btn-outline-success rounded-circle py-2" v-else-if="!!recipe.favorited"
            v-on:click="unfavoriteRecipe()">&#9733;</button>
          <button class="btn btn-success rounded-circle disabled py-2" v-else="!user.loggedIn">&#9733;</button>
        </div>
        <p><small>Serves {{ recipe.servings }}.</small></p>
        <p>{{ recipe.description }}</p>
        <p v-if="notify != ''" class="small text-center" role="alert">
          {{ notify }}<br />
        </p>
        <div class="row no-print">
          <div class="col-auto ms-auto no-print">
            <button class="btn btn-success btn-sm" v-if="!!recipe.favorited && !recipe.has_made"
              v-on:click="markCooked()">Cooked it?</button>
            <button class="btn btn-success btn-sm disabled" v-if="!!recipe.favorited && !!recipe.has_made">Recipe
              cooked!</button>
          </div>
          <div class="col-auto me-auto no-print">
            <div class="btn-group">
              <button class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown"
                aria-expanded="false">Share it!</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" v-on:click="shareRecipe()" href="#">Copy URL</a></li>
                <li><a class="dropdown-item" v-on:click="print()" href="#">Print Recipe</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="row mx-3 px-3 pt-3 pb-2 border-top print-content" id="ingredients">
        <h3>Ingredients</h3>
        <ul>
          <li v-for="ingredient in recipe.ingredients_list">{{ ingredient }}</li>
        </ul>
      </section>

      <section class="row mx-3 px-3 pt-3 pb-2 border-top print-content" id="directions">
        <h3>Directions</h3>
        <ol>
          <li v-for="step in recipe.steps">{{ step.description }}</li>
        </ol>
      </section>

    </div>
    <div class="m-3 no-print">
      <router-link class="btn btn-secondary " to="/recipes">All Recipes</router-link>
    </div>
  </div>
</template>

<style>
@media print {

  .no-print {
    display: none;
  }

  .print-content {
    display: block;
    max-width: 680px;
  }
}
</style>