<script>
import axios from "axios"
import Multiselect from '@vueform/multiselect'
import bootstrap from 'bootstrap'

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
          this.notify = response.data.length > 0 ? '' : "No results found. Try using a different search term or fewer tags."
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
        .then(() => {
          this.notify = "Search saved!"
          setTimeout(() => {
            this.notify = ''
          }, 3000)
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
  <div class="recipes-index">
    <h1 class="display-3 text-center">{{ message }}</h1>

    <form v-on:submit.prevent="newSearch()">
      <div class="input-group w-50 m-auto">
        <div class="row m-auto">
          <div class="col-auto">
            <input type="text" class="form-control form-control-lg mb-3" placeholder="Try 'dinner' or 'banana'"
              aria-label="Search" v-model="searchTerm">
          </div>
          <div class="col-auto">
            <input class="btn btn-primary btn-lg mb-3" type="submit" value="Search">
          </div>
        </div>
        <Multiselect class="w-50 m-auto" v-model="searchTags" v-if="recipes.length > 0" placeholder="Refine by Tags"
          :options="tags" valueProp="name" label="name" mode="tags" :searchable="true" v-on:select="newSearch()">
        </Multiselect>
      </div>
    </form>

    <div v-if="recipes.length > 0" class="row align-items-end">
      <div class="col-2">
        <label for="sort" class="form-label">Sort:</label>
        <select id="sort" class="form-select form-select-sm" v-model="sort" v-on:change="newSearch()">
          <option value="ASC">A - Z</option>
          <option value="DESC">Z - A</option>
        </select>
      </div>
      <div class="col-auto ms-auto">
        <button class="btn btn-success btn-sm" v-on:click="favoriteSearch()">Save this Search</button>
        <button class="btn btn-secondary btn-sm" v-on:click="clearSearch()">Clear Search</button>
      </div>
    </div>

    <div class="small text-center" role="alert">
      {{ notify }}
    </div>

    <div v-for="recipe in recipes">
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
      <button class="btn btn-primary" v-on:click="showRecipe(recipe.id)">Recipe Details</button>
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
</template>


<style src="@vueform/multiselect/themes/default.css">
</style>
<style>
</style>