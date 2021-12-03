<template>
  <div>
    <p class="link" v-if="movie" @click="goDetail(movie.id)">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="영화포스트" class="poster">
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'movieCard',
  props: {
    movie: Object,
  },
  methods: {
    goDetail: function (id) {
      if (this.isLogin) {
        this.$router.push({ name: 'Movie', params: { movieId: id }})
      } else {
        this.$router.push({ name: 'Login'})
      }
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  }
}
</script>

<style>
  .poster {
    box-shadow: 2.5px 2.5px 2.5px rgba(255,255,255,.1);
    width: 250px;
    height: 366px;
  }
</style>