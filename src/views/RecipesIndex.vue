<script>
import axios from "axios"
import Multiselect from '@vueform/multiselect'
import { user } from '../user.js'

export default {
  components: { Multiselect },

  created: function () {
    if (this.$route.query.q || this.$route.query.tags) {
      this.searchTerm = this.$route.query.q || ''
      this.searchTags = this.$route.query.tags.split(',') || []
      this.newSearch()
    }
  },

  data: function () {
    return {
      user,
      notify: '',
      offset: 0,
      options: [{ id: 0, name: 'tag' }],
      recipes: [],
      searchTerm: '',
      searchTags: [],
      sort: 'ASC',
      tags: []
    };
  },

  methods: {
    getTags: function () {
      this.tags = []
      this.recipes.forEach(recipe => {
        recipe.tags.forEach(tag => {
          if (!this.tags.includes(tag.name)) {
            this.tags.push(tag.name)
          }
        })
      })
      this.tags = this.tags.sort()
    },
    newSearch: function () {
      this.offset = 0
      this.getRecipes()
      history.pushState(null, "", `/recipes?q=${this.searchTerm}&tags=${this.searchTags}`,)
    },
    updateSearch: function () {
      this.offset = 0
      this.getRecipes()
      history.pushState(null, "", `/recipes?q=${this.searchTerm}&tags=${this.searchTags}`,)
    },
    getRecipes: function () {
      this.notify = "Searching..."
      let url = `/recipes.json?q=${this.searchTerm}&offset=${this.offset}&sort=${this.sort}`
      if (this.searchTags != '') {
        url = `${url}&tags=${this.searchTags}`
      }
      axios.get(url)
        .then(response => {
          this.recipes = response.data
          this.notify = response.data.length > 0 ? '' : "No results found. Try using a different search term or fewer tags."
          this.getTags()
        })
    },
    nextPage: function () {
      this.offset += 20
      this.getRecipes()
      document.getElementById("search-results").scrollIntoView()
    },
    prevPage: function () {
      this.offset -= 20
      this.getRecipes()
      document.getElementById("search-results").scrollIntoView()
    },
    favoriteSearch: function () {
      let currentSearch = { q: this.searchTerm }
      if (this.searchTags != '') {
        currentSearch.tags = this.searchTags
      }
      axios.post("/favorite_searches.json", currentSearch)
        .then(() => {
          this.notify = "Search saved!"
          setTimeout(() => {
            this.notify = ''
          }, 5000)
        })
    },
    clearSearch: function () {
      this.searchTerm = ''
      this.searchTags = []
      this.sort = 'ASC'
    }
  },
};
</script>

<template>
  <div class="text-center">
    <div class="px-4 pt-5">
      <h1 class="display-5 m-5">All the Recipes, none of the SEO</h1>
      <form v-on:submit.prevent="newSearch()">
        <div class="input-group w-50 m-auto">
          <div class="row m-auto">
            <input type="text" class="form-control form-control-lg my-2" placeholder="Try 'chicken' or 'banana'"
              aria-label="Search" v-model="searchTerm">
            <input class="btn btn-primary btn-lg my-2" type="submit" value="Search"><br />
          </div>
        </div>
        <div class="row w-25 mx-auto my-2">
          <Multiselect v-model="searchTags" v-if="recipes.length > 0" placeholder="Refine by Tags" :options="tags"
            valueProp="name" label="name" mode="tags" :searchable="true" v-on:select="updateSearch()">
          </Multiselect>
        </div>
      </form>
      <div class="small text-center mb-3">
        <button v-if="recipes.length > 0 || notify != ''" class="btn btn-secondary btn-sm m-1"
          v-on:click="clearSearch()">Clear
          Search</button>
        <p role="alert">{{ notify }}</p>
      </div>
    </div>
  </div>

  <div id="search-results" class="mx-auto my-5" style="max-width: 960px;">
    <div v-if="recipes.length > 0" class="container m-auto">
      <div class="mb-3 row align-items-end">
        <div class="col-2 mb-3">
          <label for="sort" class="form-label">Sort:</label>
          <select id="sort" class="form-select form-select-sm" v-model="sort" v-on:change="updateSearch()">
            <option value="ASC">A - Z</option>
            <option value="DESC">Z - A</option>
          </select>
        </div>
        <div class="col-auto ms-auto mb-3">
          <button v-if="user.loggedIn" class="btn btn-primary mx-1" v-on:click="favoriteSearch()">Save this
            Search</button>
          <button v-else="!user.loggedIn" class="btn btn-primary mx-1 disabled">Save this Search</button>
        </div>
      </div>


      <div v-for="recipe in recipes">
        <div class="row">
          <div class="col-auto">
            <h2>{{ recipe.name }}</h2>
          </div>
        </div>
        <p>{{ recipe.description.slice(0, 200) }}<span v-if="recipe.description.length > 200">...</span></p>
        <router-link class="btn btn-primary" v-bind:to="`/recipes/${recipe.id}`">Recipe Details</router-link>
        <hr />
      </div>

      <div class="row">
        <div class="col-auto me-auto">
          <button class="btn btn-secondary" v-if="offset > 0" v-on:click="prevPage()">Previous Page</button>
        </div>
        <div class="col-auto ms-auto">
          <button class="btn btn-secondary" v-if="recipes.length === 20" v-on:click="nextPage()">Next Page</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style src="@vueform/multiselect/themes/default.css">
</style>
<style>
</style>