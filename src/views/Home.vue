<template>
  <div>
    <!-- backdrop_path -->
    <!-- https://image.tmdb.org/t/p/original/oE6bhqqVFyIECtBzqIuvh6JdaB5.jpg -->
    <div>
    </div>
    <!-- poster_path -->
    <!-- https://image.tmdb.org/t/p/w500/14L4NGrqO4r7gJtVRiSRP5rNsL5.jpg -->
    <div>
      <popular-movies></popular-movies>
    </div>
    <div>
      <top-rated-movies></top-rated-movies>
    </div>
    <div>
      <genre-movies></genre-movies>
    </div>
  </div>
</template>

<script>
import popularMovies from '@/components/home/popularMovies'
import topRatedMovies from '@/components/home/topRatedMovies'
import genreMovies from '@/components/home/genreMovies'


// import axios from 'axios'

export default {
  name: 'Home',
  components: {
    popularMovies,
    topRatedMovies,
    genreMovies,
  },
}
</script>

<style>
  .link {
    cursor: pointer;
  }
</style>