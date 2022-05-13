<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Saved Searches",
      favorites: []
    };
  },
  created: function () {
    this.getFavoriteSearches()
  },
  methods: {
    getFavoriteSearches: function () {
      axios.get("/favorite_searches.json")
        .then(response => {
          this.favorites = response.data
        })
    }
  },
};
</script>

<template>
  <div class="favorite-searches">
    <h1>{{ message }}</h1>
    <h2>What can I make with... ?</h2>
    <div v-for="favorite in favorites">
      <router-link v-bind:to="`/recipes?q=${favorite.search_term}&tags=${favorite.tags}`">{{ favorite.search_term }}
      </router-link>
      <div v-if="favorite.tags.length > 0"> tags: <span v-for="tag in favorite.tags">{{ tag }}&nbsp;</span></div>
    </div>
  </div>
</template>

<style>
</style>