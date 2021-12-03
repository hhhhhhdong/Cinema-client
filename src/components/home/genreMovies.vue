<template>
  <div v-if="genresIds">
    <div>
      <genre-movies-item 
        v-for="genre in genresIds" 
        :key="genre.id" 
        :genre="genre" 
      ></genre-movies-item>
    </div>
  </div>
</template>

<script>
import genreMoviesItem from '@/components/home/genreMoviesItem'

import axios from 'axios'

export default {
  name: 'genreMovies',
  data: function () {
    return {
      genresIds: null,
    }
  },
  components: {
    genreMoviesItem,
  },
  created: function () {
    axios({
      method: 'get',
      url: '/movies/genres/ids/',
    })
    .then(res => {
      this.genresIds = res.data
    })
    .catch(err => {
      console.log(err)
    })
  },
}
</script>

<style>

</style>