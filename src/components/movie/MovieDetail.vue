<template>
  <div v-if="movie" class="text-light">
    <div>
      <p class="mt-2 mb-0" style="font-size: 3rem;">{{ movie.title }}</p>

    </div>
    <hr class="mt-0" style="height: 2px;">
    <div v-if="videoUrl" class="mb-5">
      <iframe 
        width="1350" height="720"
        :src="videoUrl">
      </iframe>
    </div>
    <div class="d-flex justify-content-around mx-5 px-5">
      <div class="mx-3">
        <img :src="posterUrl" alt="포스터" width="400px">

      </div>
      <div class="px-5">

        <div class="text-start" style="font-size: 1.4rem;">
          <p>{{ releaseDate }}</p>
          <div>
            <span 
              v-for="genre in movie.genres" 
              :key="genre.id"
              class="me-2"
            >
            {{ genre.name }}</span>
          </div>
          <star-rating :rating="movie.vote_average/2" :read-only="true" :increment="0.01" :star-size="25"></star-rating>
          <p class="mt-5">{{ movie.overview }}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import axios from 'axios'

export default {
  name: 'MovieDetail',
  components: {
    StarRating,
  },
  data: function () {
    return {
      movie: null,
      posterUrl: null,
      releaseDate: null,
      videoUrl: null,
    }
  },
  props: {
    movieId: [Number, String],
  },
  methods: {
    getMovie: function () {
      axios({
        method: 'get',
        url: `/movies/${this.movieId}/`
      })
      .then(res => {
        console.log(res.data)
        this.movie = res.data
        this.posterUrl = `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
        const data = this.movie.release_date.split('-')
        this.releaseDate = `${data[0]}. ${data[1]}`
      })
      .catch(err => {
        console.log(err)
      })
    },
    getMovieVideo: function () {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.movieId}/videos`,
        params: {
          api_key: process.env.VUE_APP_TMDB_API_KEY,
          language: 'ko-KR'
        }
      })
      .then(res => {
        const getVideoKey = function () {
          // console.log(res.data.results)
          for (let video of res.data.results) {
            if (video.type === "Trailer") {
              return `https://www.youtube.com/embed/${video.key}`
            } else if (video.type === "Teaser") {
              return `https://www.youtube.com/embed/${video.key}`
            }
          }
        }
        this.videoUrl = getVideoKey()
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getMovie()
    this.getMovieVideo()
  }
}
</script>

<style>

</style>