<template>
  <div class="col-3" style="margin: 10px 0">
    <img
      class="link"
      :src="posterUrl"
      :alt="movie.title"
      style="width: 250px"
      @click="goDetail(movie.id)"
    />
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: Object,
  },
  methods: {
    goDetail: function (id) {
      this.$router.push({ name: "Movie", params: { movieId: id } })
    },
  },
  computed: {
    posterUrl: function () {
      return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
    },
  },
}
</script>

<style></style>
