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
          document.getElementById('search-results').scrollIntoView();
        })

    },
    showRecipe: function (id) {
      this.$router.push(`/recipes/${id}`)
    },
    nextPage: function () {
      this.offset += 20
      this.getRecipes()
    },
    prevPage: function () {
      this.offset -= 20
      this.getRecipes()
    },
    favoriteSearch: function () {
      axios.post("/favorite_searches.json", { q: this.searchTerm, tags: this.searchTags })
        .then(this.notify = "Search favorited!")
    }
  },
};
</script>

<template>
  <!-- ===============================================-->
  <!--    Main Content-->
  <!-- ===============================================-->
  <main class="main" id="top">

    <section class="py-0" id="home">
      <div class="bg-holder d-none d-md-block"
        style="background-image:url(assets/img/gallery/dinner-table.jpg);background-position:right bottom;">
        -->
      </div>
      <!--/.bg-holder-->

      <div class="bg-holder d-block d-md-none"
        style="background-image:url(assets/img/gallery/dinner-table.jpg);background-position:right top;">
      </div>
      <!--/.bg-holder-->

      <div class="container">
        <div class="row align-items-center min-vh-md-75">
          <div class="col-md-7 col-lg-6 py-6 text-sm-start text-center"
            style="background-color:rgba(255, 255, 255, 0.7)">
            <h1 class="mt-6 mb-sm-4 display-4 fw-semi-bold lh-sm fs-4 fs-lg-6 fs-xxl-7">Just recipes, <br
                class="d-block d-lg-none d-xl-block" />no SEO</h1>
            <p class="mb-4 fs-1">Find and favorite to get right to the food</p>
            <div class="pt-3">

              <form v-on:submit.prevent="newSearch()">
                <div class="input-group w-xl-75 w-xxl-50 d-flex flex-end-center">
                  <input class="form-control rounded-pill border-0 font-base"
                    placeholder="Search for an ingredient or keyword" type="text" v-model="searchTerm"><img
                    class="input-box-icon me-3" src="assets/img/illustrations/search.png" width="18" alt="Search" />
                  <p></p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================-->
    <!-- <section> begin ============================-->



    <section class="py-8" id="search-results">

      <div class="container" v-if="recipes.length > 0">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 text-center mb-7">
            <h1 class="fw-semi-bold text-warning">Search<span class="text-1100"> results</span></h1>
          </div>
          <div class="col-lg-9">

            <div>
              <label for="sort">Sort:</label>
              <select id="sort" v-model="sort">
                <option value="ASC">A - Z</option>
                <option value="DESC">Z - A</option>
              </select>
              <Multiselect v-model="searchTags" placeholder="Tags" :options="tags" valueProp="name" label="name"
                mode="tags" :searchable="true">
              </Multiselect>
              <button class="btn btn-primary btn-sm" v-on:click="newSearch()">Update Results</button>
              <button class="btn btn-primary btn-sm" v-on:click="favoriteSearch()">Save this Search</button>
              <p>{{ notify }}</p>
            </div>
            <div class="accordion" id="accordion-recipes">
              <div class="accordion-item mb-5 border border-x-0 border-bottom-0 border-200" v-for="recipe in recipes">
                <div class="accordion-header" v-bind:id="`heading${recipe.id}`">
                  <div class="accordion-button collapsed" role="button" data-bs-toggle="collapse"
                    v-bind:data-bs-target="`#collapse${recipe.id}`" aria-expanded="true"
                    v-bind:aria-controls="`collapse${recipe.id}`">
                    <div class="row w-100 justify-content-center">
                      <div class="col-sm-6 font-base"><span class="mb-0 fw-bold text-start fs-1 text-1200">{{
                          recipe.name
                      }}</span>
                        <p class="my-2"></p>
                      </div>

                      <div class="col-4 col-sm-2 text-end">
                        <h5 class="mb-0 font-base fw-bold">Favorited?</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-collapse collapse shadow-lg" v-bind:id="`collapse${recipe.id}`"
                  v-bind:aria-labelledby="`heading${recipe.id}`" data-bs-parent="#accordion-recipes">
                  <div class="accordion-body">
                    <div class="row justify-content-center-center">

                      <div class="col-12 col-sm-9 mt-4 mt-sm-0 d-sm-block d-flex flex-column">
                        <ul>
                          <li class="fw-semi-bold text-black">A note</li>
                        </ul>
                        <p>{{ recipe.description }}
                        </p> <button class="btn btn-link px-0 font-base"
                          v-on:click="showRecipe(recipe.id)">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="col-lg-12 d-flex justify-content-center">

            <button class="btn btn-lg btn-primary rounded-pill font-base" v-if="offset > 0" v-on:click="prevPage()">Prev
              Page</button>
            <button class="btn btn-lg btn-primary rounded-pill font-base" v-if="recipes.length === 20"
              v-on:click="nextPage()">Next Page</button>

          </div>

        </div>
      </div>
      <!-- end of .container-->

    </section>
    <!-- <section> close ============================-->
    <!-- ============================================-->



    <section class="py-0">
      <div class="bg-holder"
        style="background-image:url(assets/img/illustrations/footer-bg.png);background-position:center;background-size:cover;">
      </div>
      <!--/.bg-holder-->

      <div class="container">
        <div class="row justify-content-between pb-5 pt-8">
          <div class="col-12 col-lg-auto mb-5 mb-lg-0"><a class="d-flex align-items-center fw-semi-bold fs-3" href="#">
              <img class="me-3" src="assets/img/gallery/logo.png" alt="" />
              <div class="text-primary font-base">Sevi</div>
            </a></div>
          <div class="col-auto mb-3">
            <h6 class="mb-5 font-base fs-1">About us </h6>
            <ul class="list-unstyled mb-md-4 mb-lg-0">
              <li class="mb-3"><a class="text-700 text-decoration-none" href="#!">Vision</a></li>

            </ul>
          </div>

        </div>
        <div class="row flex-center">
          <div class="col-auto mb-2">
            <p class="mb-0 fs--1 my-2 text-center">&copy; This template is made with&nbsp;
              <svg class="bi bi-suit-heart-fill" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="#723182" viewBox="0 0 16 16">
                <path
                  d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z">
                </path>
              </svg>&nbsp;by&nbsp;<a href="https://themewagon.com/" target="_blank">ThemeWagon </a>
            </p>
          </div>

        </div>
      </div>
    </section>
  </main>
  <!-- ===============================================-->
  <!--    End of Main Content-->
  <!-- ===============================================-->




  <!-- ===============================================-->
  <!--    JavaScripts-->
  <!-- ===============================================-->


  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&amp;display=swap"
    rel="stylesheet">



</template>


<style src="@vueform/multiselect/themes/default.css">
</style>
<style>
</style>