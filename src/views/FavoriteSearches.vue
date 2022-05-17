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
    },
    destroyFavoriteSearch: function (favorite) {
      axios.delete(`/favorite_searches/${favorite.id}.json`)
        .then(() => {
          console.log("deleted!")
          this.favorites.splice(this.favorites.indexOf(favorite), 1)
        })
    }
  },
};
</script>

<template>
  <div class="favorite-searches m-auto" style="max-width: 960px">
    <h1 class="display-3 text-center m-5">Saved Searches</h1>

    <h2>Find me a dish that's...</h2>
    <div class="row">
      <div v-for="favorite in favorites" class="col-sm-4 my-3">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <router-link class="col-lg col-auto"
                v-bind:to="`/recipes?q=${favorite.search_term}&tags=${favorite.tags}`">
                <h5 class="card-title">{{ favorite.search_term }}</h5>
              </router-link>
              <div class="col-auto ms-auto">
                <button type="button" class="btn-close" v-on:click="destroyFavoriteSearch(favorite)"></button>
              </div>
              <h6 class="card-subtitle mb-2 text-muted" v-if="favorite.tags.length > 0">and tagged:
                <ul>
                  <li v-for="tag in favorite.tags">{{ tag }}</li>
                </ul>
              </h6>
            </div>

          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<style>
</style>