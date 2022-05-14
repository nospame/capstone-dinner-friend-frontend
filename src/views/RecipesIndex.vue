<script>
import axios from "axios"
import Multiselect from '@vueform/multiselect'

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
      message: "Dinner Party's Friend",
      notify: '',
      tags: [],
      recipes: [],
      searchTerm: '',
      offset: 0,
      searchTags: [],
      options: [{ id: 0, name: 'tag' }],
      sort: 'ASC'
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
    getRecipes: function () {
      this.notify = "Searching..."
      let url = `/recipes.json?q=${this.searchTerm}&offset=${this.offset}&sort=${this.sort}`
      if (!!this.searchTags) {
        url = `${url}&tags=${this.searchTags}`
      }
      axios.get(url)
        .then(response => {
          this.recipes = response.data
          this.notify = response.data.length > 0 ? '' : "No results found. Try using a different search term."
          this.getTags()
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
    },
    favoriteSearch: function () {
      axios.post("/favorite_searches.json", { q: this.searchTerm, tags: this.searchTags })
        .then(this.notify = "Search favorited!")
    }
  },
};
</script>

<template>
  <div class="recipes-index">
    <h1>{{ message }}</h1>
    <p>Search for an ingredient or keyword</p>
    <form v-on:submit.prevent="newSearch()">
      <input placeholder="Search" type="search" v-model="searchTerm">
      <input class="btn btn-primary" type="submit" value="Search">
    </form>
    <label for="sort">Sort:</label>
    <select id="sort" v-model="sort">
      <option value="ASC">A - Z</option>
      <option value="DESC">Z - A</option>
    </select>
    <div v-if="recipes.length > 0">
      <Multiselect v-model="searchTags" placeholder="Filter" :options="tags" valueProp="name" label="name" mode="tags"
        :searchable="true">
      </Multiselect>
      <button class="btn btn-primary btn-sm" v-on:click="newSearch()">Update Results</button>
      <button class="btn btn-primary btn-sm" v-on:click="favoriteSearch()">Save this Search</button>
    </div>
    <p>{{ notify }}</p>
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


<style src="@vueform/multiselect/themes/default.css">
</style>
<style>
</style>