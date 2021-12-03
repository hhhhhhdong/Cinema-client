<template>
  <div class="container-div">
    <h3 class="movie-list-title">TOP RATED</h3>
    <swiper class="swiper" :options="swiperOption" v-if="movies">
      <swiper-slide v-for="movie in movies" :key="movie.id">
        <movie-card :movie="movie"></movie-card>
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <div class="swiper-button-prev" slot="button-prev"></div> 
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import movieCard from '@/components/home/movieCard'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'topRatedMovies',
  data: function () {
    return {
      movies: null,
      swiperOption: { 
        slidesPerView: 6, 
        spaceBetween: 0, 
        loop: true, 
        pagination: { 
          el: '.swiper-pagination', 
          clickable: true 
        }, 
        navigation: { 
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev' 
        } 
      }
    }
  },
  components: {
    movieCard,
    Swiper,
    SwiperSlide,
  },
  created: function () {
    axios({
      method: 'get',
      url: '/movies/top_rated/',
    })
    .then(res => {
      this.movies = res.data
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>