<template>
  <div class="text-light">
    <div class="container-fluid">
      <movie-detail :movie-id="movieId"></movie-detail>
      <hr>
      <review :movie-id="movieId"></review>
    </div>
  </div>
</template>

<script>
import MovieDetail from '@/components/movie/MovieDetail'
import Review from '@/components/review/Review'

export default {
  name: 'Movie',
  data: function () {
    return {
      movieId: '',
    }
  },
  components: {
    MovieDetail,
    Review
  },
  created: function () {
    this.movieId = this.$route.params.movieId
  }
}
</script>

<style>

</style>