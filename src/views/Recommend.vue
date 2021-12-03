<template>
  <div>
    <h1 class="page-title">Genre Score Board</h1>
    <div>
      <span class="genre-span" v-for="genre in genres" :key="genre.id"
        >{{ genre.genre_name }} {{ genre.score / 2 }}</span
      >
    </div>
    <div class="row" v-if="movies && movies.length === 0">
      <h1 style="color: #5e5e5e;">No Reviews</h1>
    </div>
    <div class="row" v-if="movies && movies.length !== 0">
      <movie-card v-for="movie in movies" :key="movie.id" :movie="movie">
      </movie-card>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import getToken from "@/util/getToken"
import { mapState } from "vuex"

import MovieCard from "@/components/recommend/MovieCard.vue"

export default {
  name: "Recommend",
  data: function () {
    return {
      movies: null,
      board: null,
      genres: [],
    }
  },
  components: {
    MovieCard,
  },
  computed: {
    ...mapState(["loginUser"]),
  },
  created: function () {
    axios({
      methods: "GET",
      url: "/reviews/recommend/",
      headers: getToken(),
    })
      .then((res) => {
        this.board = res.data[0]
        for (let genreId in res.data[0]) {
          this.genres.push(res.data[0][genreId])
        }
        this.movies = res.data[1]
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style>
.genre-span {
  font-size: 25px;
  display: inline-block;
  padding: 10px 15px;
  margin: 20px 20px;
  background: grey;
  border-radius: 10px;
}
</style>
