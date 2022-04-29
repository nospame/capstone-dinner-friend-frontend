<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to the Recipes Show",
      recipe: {}
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
    </div>
  </div>
</template>

<style>
</style>